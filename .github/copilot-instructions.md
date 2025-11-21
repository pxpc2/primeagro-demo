# ConfidensAgro - AI Coding Instructions

## Project Overview
**ConfidensAgro** is a Next.js agricultural credit consultation platform for Brazilian rural credit programs (PNCF/PRONAF). It manages farmer eligibility assessment, project documentation, and multi-step agricultural credit applications with complex financial calculations across 19+ form tabs.

## Architecture & Tech Stack
- **Framework**: Next.js 14 with App Router (`app/`)
- **Database**: Supabase (PostgreSQL with Row Level Security)
- **Authentication**: Supabase Auth with middleware session refresh
- **Styling**: Tailwind CSS + shadcn/ui components (Radix UI primitives)
- **Forms**: React Hook Form + Zod validation (not fully implemented)
- **State Management**: React useState only - no Redux/Zustand
- **Icons**: Heroicons + Lucide React

## Critical Authentication Pattern

### 3-Layer Supabase Client Pattern
**ALWAYS** use the correct client for the context:

1. **`utils/supabase/server.js`** - Server Components & Server Actions
   ```javascript
   import { createClient } from "@/utils/supabase/server";
   const supabase = createClient(); // Uses Next.js cookies()
   ```

2. **`utils/supabase/client.js`** - Client Components (browser)
   ```javascript
   import { createClient } from "@/utils/supabase/client";
   const supabase = createClient(); // Browser client
   ```

3. **`utils/supabase/middleware.js`** - Middleware session refresh
   - Called in `middleware.js` to refresh auth sessions
   - Runs on every request via matcher pattern

**Rule**: Never import server client in client components or vice versa.

## Data Flow Architecture

### Server Action Pattern (Primary Data Flow)
All database operations go through server actions in `app/*/actions.js`:

```javascript
// app/projeto/actions.js pattern
"use server"; // REQUIRED directive

export async function submitSomeData({ formData }) {
  const supabase = createClient(); // server.js
  const { data: { user } } = await supabase.auth.getUser();
  const authUserID = user.id;
  
  // Always include authuser_id for RLS
  const { error } = await supabase
    .from("table_name")
    .upsert({ ...formData, authuser_id: authUserID }, 
           { onConflict: ["authuser_id"] });
  
  if (error) throw new Error(error.message);
}
```

### Row Level Security (RLS) Enforcement
- All tables filter by `authuser_id` via Supabase RLS policies
- Admin users bypass RLS (emails in `ADMIN_EMAIL` array in `utils/constants.js`)
- Check admin status: `const isAdmin = await isAdminUser();`

### Data Aggregation Pattern
The `/projeto` page loads ALL tab data upfront via `getProjetoFormsData()`:
- Fetches 15+ related tables in one server action
- Passes nested data structure to tab components
- Each tab receives `defaultValues`, `isAdmin`, and cross-tab dependencies

## Key Business Logic Patterns

### Multi-Step Form System (`/projeto` page)
**Tab Navigation with Shared State:**
```javascript
// Pattern in app/projeto/page.jsx
const [formData, setFormData] = useState(null);
const [currentTab, setCurrentTab] = useState("Menu");

useEffect(() => {
  const fetchData = async () => {
    const data = await getProjetoFormsData(); // Loads ALL tabs
    setFormData(data);
  };
  fetchData();
}, []);

const renderContent = (tabName) => {
  switch (tabName) {
    case "Pré-análise": 
      return <PreAnaliseTab 
        defaultValues={formData?.aba_preanalise} 
        isAdmin={isAdmin} 
      />;
    case "Receitas":
      return <ReceitasTab 
        data={formData?.aba_receitas}
        isAdmin={isAdmin}
        vendaAnimaisData={vendasAnimaisData} // Cross-tab dependency
        evolucaoRebanhoData={formData?.aba_evolucao_rebanho}
      />;
  }
};
```

**Tab List**: 19 tabs defined in `PROJETO_TABS` constant (Menu, Pré-análise, Identificação do Beneficiário, Dados do Imóvel, Inventário, Tipos de solo, Investimentos, Cronograma, Orçamentos, SIB, Uso e suporte da terra, Total UA, Evolução do rebanho, Receitas, Despesas, Simulador PNCF, Simulador PRONAF, Fluxos de Caixa, Capacidade de Pagamento).

### Document Management System
Documents organized by category with status tracking:

```javascript
// utils/constants.js - DOCUMENTOS array
{ id: "1.1", nome: "DAP OU CAF ATIVA", descricao: "Ver mais" }
{ id: "2.0", nome: "LAUDO DE AVALIAÇÃO...", descricao: "Ver mais" }
{ id: "3.0", nome: "DECLARAÇÃO DE INTENÇÃO...", descricao: "Ver mais" }
{ id: "4.0", nome: "CERTIDÃO DE INTEIRO TEOR...", descricao: "Ver mais" }
```

**Categories**: 1.x (Beneficiário), 2.x (Técnicos), 3.x (Vendedor), 4.x (Imóvel)

**Upload/Download Pattern** (Supabase Storage):
```javascript
// components/documentos/DocumentosDashboard.jsx
const handleViewDocument = async (doc) => {
  const signedUrl = await downloadDoc(authuser_id, `${doc.id}.pdf`);
  window.open(signedUrl, '_blank');
};
```

### Admin Authorization Pattern
```javascript
// utils/constants.js
export const ADMIN_EMAIL = ["pedrodaia.c@gmail.com", "teste2@teste"];

// app/projeto/actions.js
export async function isAdminUser() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return ADMIN_EMAIL.some(email => user.email === email);
}
```

Admin users can:
- Edit all forms (regular users have restrictions)
- View all users' data (RLS bypass in database policies)

## Form Handling Patterns

### Standard Tab Component Structure
```javascript
"use client"; // Most tabs are client components

export default function SomeTab({ defaultValues, isAdmin }) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm({ defaultValues });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await serverAction({ formData: data });
      toast({ title: "Salvo com sucesso" });
      setIsEditing(false);
    } catch (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
    }
    setLoading(false);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Heading 
        tabName="Tab Name"
        onEdit={() => setIsEditing(true)}
        onSave={form.handleSubmit(onSubmit)}
        isEditing={isEditing}
        isLoading={loading}
        isAdmin={isAdmin}
      />
      {/* Form fields */}
    </form>
  );
}
```

### Upsert Pattern for Existing vs New Data
Server actions frequently handle both updates and inserts:

```javascript
// Pattern: Split data by presence of `id` field
const existingEntries = data.filter(item => item.id);
const newEntries = data.filter(item => !item.id);

// Update existing
if (existingEntries.length > 0) {
  await supabase.from("table").upsert(existingEntries, { onConflict: ["id"] });
}

// Insert new
if (newEntries.length > 0) {
  const withAuthUser = newEntries.map(e => ({ ...e, authuser_id }));
  await supabase.from("table").insert(withAuthUser);
}
```

## Development Workflows

### Local Development
```bash
npm run dev    # Start dev server on localhost:3000
npm run build  # Production build (checks for errors)
npm run start  # Start production server
npm run lint   # Run ESLint
```

### Environment Setup
Required `.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://[project].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[anon_key]
```

### Database Naming Conventions
- **Tables**: `aba_[tab_name]` (e.g., `aba_preanalise`, `aba_investimentos`)
- **Sub-tables**: `aba_[parent]_[subtable]` (e.g., `aba_evolucao_rebanho_indicadores_tecnicos`)
- **All tables include**: `authuser_id` (UUID), `created_at` (timestamp)
- **Columns**: Snake_case (`campo_1`, `valor_total_imovel`)

## Project-Specific Conventions

### File Organization
```
app/
  [route]/
    actions.js       # Server actions (ALWAYS "use server")
    page.jsx         # Server component (default)
    layout.js        # Optional layout wrapper
components/
  ui/               # shadcn/ui primitives (Button, Input, Table, etc.)
  [feature]/        # Feature-specific (projeto/, documentos/, dashboard/)
utils/
  constants.js      # ALL business constants (DOCUMENTOS, PROJETO_TABS, etc.)
  municipios.js     # Brazilian municipality data
  supabase/         # Supabase client configs
```

### Constants Management
**CRITICAL**: All business logic constants in `utils/constants.js`:
- `DOCUMENTOS` - Document types and categories
- `PROJETO_TABS` - Tab definitions for multi-step form
- `ADMIN_EMAIL` - Admin user emails
- `INVESTIMENTO_CATEGORIAS` / `INVESTIMENTO_ITENS` - Investment categories
- `INDICADORES_TECNICOS_DESCRICOES` - Technical indicator labels
- `ANO_INICIAL` - Base year for calculations

### Data Transformation Patterns
Common pattern: Database fields → Client-friendly objects

```javascript
// app/projeto/actions.js - getDespesasData()
const filtered = {
  custoPadraoBovinocultura: dados[0]?.bovinocultura_custopadrao || 0,
  totalCustos: [
    dados[0]?.bovinocultura_custo_ano0 || 0,
    dados[0]?.bovinocultura_custo_ano1 || 0,
    // ... map flat DB columns to array structure
  ],
};
```

### Cross-Tab Data Dependencies
Several tabs depend on data from other tabs:
- **Receitas** needs `evolucaoRebanhoData` for animal sales
- **Despesas** needs `receitasData` for profit calculations
- **Fluxo de Caixa** needs `receitasData`, `despesasData`, `preAnaliseData`
- **Capacidade Pagamento** needs almost all other tabs

**Pattern**: Pass dependencies via props in `renderContent()` switch statement.

## Error Handling & User Feedback

### Toast Notifications
```javascript
import { useToast } from "@/components/ui/use-toast";

const { toast } = useToast();

toast({
  title: "Sucesso",
  description: "Dados salvos com sucesso",
});

toast({
  title: "Erro",
  description: error.message,
  variant: "destructive",
});
```

### Error Redirects
Server actions redirect to error page:
```javascript
if (error) {
  return redirect("/error?message=" + error.message);
}
```

### Loading States
```javascript
const [loading, setLoading] = useState(false);
// Show Loader2 spinner during async operations
{loading && <Loader2 className="animate-spin" />}
```

## Common Pitfalls to Avoid

1. **Never use client Supabase client in server actions** - causes auth issues
2. **Always add `authuser_id` to inserts/upserts** - RLS will fail otherwise
3. **Don't forget `"use server"` directive** - actions won't work without it
4. **Use correct onConflict for upserts** - usually `["authuser_id"]` or `["id"]`
5. **Tab components expect arrays or objects** - check `defaultValues` structure
6. **Currency formatting** - use `.replace(".", "").replace(",", ".")` to parse Brazilian format
7. **Date formatting** - timestamps from DB need `new Date()` conversion
8. **Middleware matcher** - must exclude static files (`_next/static`, images)
9. **Cross-tab data flow** - update parent state when child tab changes shared data (e.g., `setVendasAnimaisData` in Evolução Rebanho)
10. **Delete operations** - filter deleted IDs and sync with database (see `submitEvolucaoRebanho` for pattern)
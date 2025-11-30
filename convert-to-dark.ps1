# Script para converter PAG01, PAG02, PAG03 e PAG04 para dark mode

$files = @(
    "c:\dev\primeagro-demo\components\projeto\sumula-tab.jsx",
    "c:\dev\primeagro-demo\components\projeto\pag02-dados-imovel.jsx",
    "c:\dev\primeagro-demo\components\projeto\pag03-resumo-financiamento.jsx",
    "c:\dev\primeagro-demo\components\projeto\pag04-inventario.jsx"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        
        # Substituições específicas para cada padrão
        $content = $content -replace 'border border-gray-400 p-2', 'border border-gray-600 p-2 print:border-gray-400'
        $content = $content -replace 'border border-gray-400 p-1', 'border border-gray-600 p-1 print:border-gray-400'
        $content = $content -replace 'border border-gray-300 p-2', 'border border-gray-600 p-2 print:border-gray-300'
        $content = $content -replace 'border border-gray-300 p-1', 'border border-gray-600 p-1 print:border-gray-300'
        $content = $content -replace 'border border-gray-300 text-xs', 'border border-gray-600 text-xs print:border-gray-300'
        $content = $content -replace 'bg-gray-50', 'bg-gray-800 print:bg-gray-50'
        $content = $content -replace 'bg-yellow-50', 'bg-yellow-900 print:bg-yellow-50'
        
        Set-Content $file $content -NoNewline
        Write-Host "Processado: $file" -ForegroundColor Green
    }
}

Write-Host "Conversão para dark mode concluída!" -ForegroundColor Cyan

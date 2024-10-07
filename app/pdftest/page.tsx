"use client"
import React, { useState, useEffect } from 'react';

export default function PDFTestPageWithParams() {
    const [id, setId] = useState('1');
    const [scenario, setScenario] = useState('{}');
    const [queryParams, setQueryParams] = useState('');
    const [logs, setLogs] = useState([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        // Pre-fill query params based on the provided URL
        const defaultParams = {
            provincia: 'La Rioja',
            localidad: 'La Rioja',
            capacidad: '1',
            area: '10000',
            scenarioId: 'SCENARIO_1727968597608',
            escenarioId: '1'
        };
        setQueryParams(JSON.stringify(defaultParams, null, 2));
    }, []);

    const addLog = (message) => {
        setLogs(prev => [...prev, `${new Date().toISOString()}: ${message}`]);
    };

    const handleGeneratePDF = async () => {
        setIsGenerating(true);
        setMessage({ type: '', text: '' });
        addLog('Starting PDF generation...');

        try {
            const parsedScenario = JSON.parse(scenario);
            const parsedQueryParams = JSON.parse(queryParams);

            // Asegúrate de que scenarioId esté en searchParams
            if (!parsedQueryParams.scenarioId && parsedQueryParams.escenarioId) {
                parsedQueryParams.scenarioId = parsedQueryParams.escenarioId;
            }

            const dataToSend = {
                id,
                searchParams: parsedQueryParams,
                sceneData: { scenario: parsedScenario }
            };

            addLog(`Sending data: ${JSON.stringify(dataToSend, null, 2)}`);

            const response = await fetch('/api/generate-pdf-single', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToSend),
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'test-pdf.pdf';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
                setMessage({ type: 'success', text: 'PDF generated and downloaded successfully' });
                addLog('PDF generated successfully');
            } else {
                const errorText = await response.text();
                setMessage({ type: 'error', text: `Error: ${errorText}` });
                addLog(`Error generating PDF: ${errorText}`);
            }
        } catch (error) {
            setMessage({ type: 'error', text: `Error: ${error.message}` });
            addLog(`Error in PDF generation process: ${error.message}`);
        } finally {
            setIsGenerating(false);
        }
    };
    return (
        <div style= {{ padding: '20px', maxWidth: '800px', margin: '0 auto' }
}>
    <h1 style={ { fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' } }> PDF Generation Test Page </h1>

        < div style = {{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input 
          type="text"
placeholder = "Enter ID"
value = { id }
onChange = {(e) => setId(e.target.value)}
style = {{ padding: '5px' }}
        />
    < textarea
placeholder = "Enter scenario JSON"
value = { scenario }
onChange = {(e) => setScenario(e.target.value)}
style = {{ padding: '5px', minHeight: '100px' }}
        />
    < textarea
placeholder = "Enter query params JSON"
value = { queryParams }
onChange = {(e) => setQueryParams(e.target.value)}
style = {{ padding: '5px', minHeight: '100px' }}
        />

    < button
onClick = { handleGeneratePDF }
disabled = { isGenerating }
style = {{
    padding: '10px',
        backgroundColor: isGenerating ? '#ccc' : '#007bff',
            color: 'white',
                border: 'none',
                    cursor: isGenerating ? 'not-allowed' : 'pointer'
}}
        >
    { isGenerating? 'Generating...': 'Generate PDF' }
    </button>

{
    message.text && (
        <div style={
        {
            padding: '10px',
                backgroundColor: message.type === 'error' ? '#ffcccc' : '#ccffcc',
                    border: `1px solid ${message.type === 'error' ? '#ff0000' : '#00ff00'}`,
                        borderRadius: '5px',
                            marginTop: '10px'
        }
    }>
        { message.text }
        </div>
        )
}

<div style={ { marginTop: '20px' } }>
    <h2 style={ { fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' } }> Logs </h2>
        < pre style = {{
    backgroundColor: '#f0f0f0',
        padding: '10px',
            borderRadius: '5px',
                height: '200px',
                    overflowY: 'auto'
}}>
    { logs.join('\n') }
    </pre>
    </div>
    </div>
    </div>
  );
}
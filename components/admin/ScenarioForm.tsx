import React, { useState } from 'react';

interface ScenarioFormProps {
    scenario?: {
        id: string;
        name: string;
        description: string | null;
    };
    onSubmit: (data: any) => void;
}

const ScenarioForm: React.FC<ScenarioFormProps> = ({ scenario, onSubmit }) => {
    const [name, setName] = useState(scenario?.name || '');
    const [description, setDescription] = useState(scenario?.description || '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ name, description });
    };

    return (
        <form onSubmit= { handleSubmit } >
        <div>
        <label htmlFor="name" > Name: </label>
            < input
    type = "text"
    id = "name"
    value = { name }
    onChange = {(e) => setName(e.target.value)}
required
    />
    </div>
    < div >
    <label htmlFor="description" > Description: </label>
        < textarea
id = "description"
value = { description }
onChange = {(e) => setDescription(e.target.value)}
        />
    </div>
    < button type = "submit" > { scenario? 'Update': 'Create' } Scenario </button>
        </form>
  );
};

export default ScenarioForm;
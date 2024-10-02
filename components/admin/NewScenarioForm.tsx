"use client"

import React, { useState } from 'react';
import { Input, Button, Textarea } from "@nextui-org/react";
import { useRouter } from 'next/navigation';

const NewScenarioForm: React.FC = () => {
    const [scenarioName, setScenarioName] = useState('');
    const [description, setDescription] = useState('');
    const [validezCapacidadMin, setValidezCapacidadMin] = useState('');
    const [validezCapacidadMax, setValidezCapacidadMax] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            const response = await fetch('/api/scenarios/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: scenarioName,
                    description,
                    validez_capacidad_min: Number(validezCapacidadMin),
                    validez_capacidad_max: Number(validezCapacidadMax),
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to create scenario');
            }
            router.push('/admin/scenarios');
        } catch (err) {
            setError('An error occurred while creating the scenario. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit= { handleSubmit } className = "space-y-4" >
            <Input
        label="Scenario Name"
    value = { scenarioName }
    onChange = {(e) => setScenarioName(e.target.value)}
placeholder = "Enter new scenario name"
required
    />
    <Textarea
        label="Description"
value = { description }
onChange = {(e) => setDescription(e.target.value)}
placeholder = "Enter scenario description (optional)"
    />
    <div className="flex space-x-4" >
        <Input
          label="Validez Capacidad Mínima"
type = "number"
value = { validezCapacidadMin }
onChange = {(e) => setValidezCapacidadMin(e.target.value)}
placeholder = "Enter minimum capacity"
required
    />
    <Input
          label="Validez Capacidad Máxima"
type = "number"
value = { validezCapacidadMax }
onChange = {(e) => setValidezCapacidadMax(e.target.value)}
placeholder = "Enter maximum capacity"
required
    />
    </div>
{ error && <p className="text-red-500" > { error } </p> }
<Button type="submit" color = "primary" disabled = { isLoading } >
    { isLoading? 'Creating...': 'Create Scenario' }
    </Button>
    </form>
  );
};

export default NewScenarioForm;
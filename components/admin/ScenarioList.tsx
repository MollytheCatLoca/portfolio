"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface Scenario {
    id: string;
    name: string;
    description: string | null;
}

const ScenarioList: React.FC = () => {
    const [scenarios, setScenarios] = useState<Scenario[]>([]);

    useEffect(() => {
        fetch('/api/scenarios')
            .then((res) => res.json())
            .then((data) => setScenarios(data));
    }, []);

    return (
        <div>
        <h2>Scenarios </h2>
        <ul>
        {
        scenarios.map((scenario) => (
            <li key= { scenario.id } >
            <Link href={`/admin/scenarios/${scenario.id}`}>
                { scenario.name }
                </Link>
    { scenario.description && <p>{ scenario.description } </p> }
    </li>
        ))}
</ul>
    < Link href = "/admin/scenarios/new" > Create New Scenario </Link>
        </div>
  );
};

export default ScenarioList;
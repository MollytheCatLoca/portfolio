// app/admin/scenarios/new/page.tsx
import NewScenarioForm from '@/components/admin/NewScenarioForm';

export default function NewScenarioPage() {
    return (
        <div className= "container mx-auto p-4" >
        <h1 className="text-2xl font-bold mb-4" > Create New Scenario </h1>
            < NewScenarioForm />
            </div>
  );
}
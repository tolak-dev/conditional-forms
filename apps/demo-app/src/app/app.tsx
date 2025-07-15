import { ConditionalForm, FormSchema } from '@conditional-forms/react';
import { useForm } from "react-hook-form";
import formSchema from "./../schemas/visibility-conditions-demo.json";

export function App() {
    
  const formMethods = useForm({
    mode: "all",
  });

  const handleSubmit = (data: any) => {
    console.log("formData", data);
  };

  return (
    <div >
      <ConditionalForm
        schema={formSchema as FormSchema}
        formMethods={formMethods}
        onSubmit={(data) => handleSubmit(data)}
      />
    </div>
  );
}

export default App;

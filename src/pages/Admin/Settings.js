
import { useState } from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <SettingsIcon className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Paramètre</h1>
      </div>

      <Tabs defaultValue={activeTab} className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 bg-gray-100 border w-full mb-6">
          <TabsTrigger value="general">Générale</TabsTrigger>
          <TabsTrigger value="notification">email</TabsTrigger>
          <TabsTrigger value="demande">payement</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <div>hi</div>
        </TabsContent>
        
        <TabsContent value="notification" className="space-y-4">
        <div>Test</div>
        </TabsContent>
        
        <TabsContent value="demande" className="space-y-4">
          hello
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;

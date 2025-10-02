
import { useState } from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
// import { FeedCategoriesSettings } from '@/components/settings/FeedCategoriesSettings';
// import { BirdPricingSettings } from '@/components/settings/BirdPricingSettings';
// import { EggStockSettings } from '@/components/settings/EggStockSettings';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");
  
  // const handleSaveSettings = () => {
  //   toast({
  //     title: t('settings.saved'),
  //     description: t('settings.saved.description'),
  //   });
  // };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <SettingsIcon className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Paramètre</h1>
      </div>

      <Tabs defaultValue={activeTab} className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 bg-gray-100 border w-full mb-6">
          <TabsTrigger value="general">Générale</TabsTrigger>
          <TabsTrigger value="notification">Notificaton</TabsTrigger>
          <TabsTrigger value="demande">Demande</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <div>hi</div>
        </TabsContent>
        
        <TabsContent value="notification" className="space-y-4">
        <div>Test</div>
        </TabsContent>
        
        <TabsContent value="demande" className="space-y-4">
          {/* <EggStockSettings onSave={handleSaveSettings} /> */}
          hello
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;

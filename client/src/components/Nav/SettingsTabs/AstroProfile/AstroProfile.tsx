import React, { useState } from 'react';
import { useLocalize, useToast } from '~/hooks';
import { Input } from '~/components/ui/Input';
import { Button } from '~/components/ui/Button';
import { Label } from '~/components/ui/Label';
// Import mutation hook similar to those in client/src/data-provider/Auth/mutations.ts
import { useUpdateAstroProfile } from '~/data-provider/Auth/mutations';

const AstroProfile = () => {
  const localize = useLocalize();
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [timeOfBirth, setTimeOfBirth] = useState('');
  const [placeOfBirth, setPlaceOfBirth] = useState('');

  const { showToast } = useToast();
  const { mutateAsync: updateAstroProfileMutation, isLoading } = useUpdateAstroProfile();

  const handleSave = async () => {
    console.log('Saving Astro Profile:', { dateOfBirth, timeOfBirth, placeOfBirth });

    if (!dateOfBirth || !timeOfBirth || !placeOfBirth) {
      showToast({
        message: localize('com_nav_astro_profile_validation_error'),
        type: 'error',
      });
      return;
    }
    try {
      await updateAstroProfileMutation({
        dateOfBirth,
        timeOfBirth,
        placeOfBirth,
      });
      showToast({
        message: localize('com_nav_astro_profile_save_success'),
        type: 'success',
      });
    } catch (error) {
      showToast({ message: localize('com_nav_astro_profile_save_error'), type: 'error' });
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h2 className="text-lg font-medium">{localize('com_nav_astro_profile_title')}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {localize('com_nav_astro_profile_description')}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col space-y-2">
          <Label htmlFor="dateOfBirth">{localize('com_nav_astro_profile_dob_label')}</Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            placeholder={localize('com_nav_astro_profile_dob_placeholder')}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="timeOfBirth">{localize('com_nav_astro_profile_tob_label')}</Label>
          <Input
            id="timeOfBirth"
            type="time"
            value={timeOfBirth}
            onChange={(e) => setTimeOfBirth(e.target.value)}
            placeholder={localize('com_nav_astro_profile_tob_placeholder')}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="placeOfBirth">{localize('com_nav_astro_profile_pob_label')}</Label>
          <Input
            id="placeOfBirth"
            value={placeOfBirth}
            onChange={(e) => setPlaceOfBirth(e.target.value)}
            placeholder={localize('com_nav_astro_profile_pob_placeholder')}
          />
        </div>
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? 'Saving...' : localize('com_nav_astro_profile_save_button')}
        </Button>
      </div>
    </div>
  );
};

export default AstroProfile;
import { APPEARANCE_PREFERENCES, type AppearancePreference } from '@/constants/theme';
import { getDatabase } from '@/db/database';

const APPEARANCE_SETTING_KEY = 'appearance_preference';

function isAppearancePreference(value: unknown): value is AppearancePreference {
  return APPEARANCE_PREFERENCES.includes(value as AppearancePreference);
}

export async function getAppearancePreference(): Promise<AppearancePreference> {
  const db = await getDatabase();
  const row = await db.getFirstAsync<{ value: string }>(
    'SELECT value FROM app_setting WHERE key = ?;',
    APPEARANCE_SETTING_KEY,
  );

  return isAppearancePreference(row?.value) ? row.value : 'system';
}

export async function saveAppearancePreference(preference: AppearancePreference): Promise<void> {
  const db = await getDatabase();
  await db.runAsync(
    `INSERT INTO app_setting (key, value)
     VALUES (?, ?)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value;`,
    APPEARANCE_SETTING_KEY,
    preference,
  );
}

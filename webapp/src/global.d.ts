enum StorageKeys {
  AUTH_STORAGE_KEY = "auth_context",
}

enum HitStateTypes {
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  FAILED = "failed",
}

enum HitmanTypes {
  BOSS = "boss",
  MANAGER = "manager",
  HITMAN = "hitman",
}

interface Hit {
  id: string;
  target_name: string;
  state: string;
  hitman_id: string;
  description: string;
}

interface Hitman {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  hitman_type: HitmanTypes;
  manager: string;
  is_active: boolean;
}

export { StorageKeys, Hit, Hitman, HitStateTypes, HitmanTypes };

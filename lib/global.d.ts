declare namespace NodeJS {
    interface Global {
      mongoose: {
        conn: typeof import("mongoose") | null;
        promise: Promise<typeof import("mongoose")> | null;
      };
    }
  }
  
  declare var global: NodeJS.Global; // Ensures proper global type usage.
  
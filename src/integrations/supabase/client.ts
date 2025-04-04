
// This is a stub file to replace Supabase integration
// We're now using frontend-only data

// Create a stub client that does nothing
export const supabase = {
  from: () => ({
    select: () => ({
      data: null,
      error: null
    }),
    insert: () => ({
      select: () => ({
        data: null,
        error: null
      })
    }),
    update: () => ({
      eq: () => ({
        select: () => ({
          data: null,
          error: null
        })
      })
    }),
    delete: () => ({
      eq: () => ({
        data: null,
        error: null
      })
    }),
    or: () => ({
      data: null,
      error: null
    })
  }),
  auth: {
    getSession: async () => ({ data: { session: null } }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
  }
};

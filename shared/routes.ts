import { z } from 'zod';
import { insertClientSchema, insertAlertSchema, insertActivitySchema, clients, alerts, activities } from './schema';

export const api = {
  clients: {
    list: {
      method: 'GET' as const,
      path: '/api/clients',
      responses: {
        200: z.array(z.custom<typeof clients.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/clients/:id',
      responses: {
        200: z.custom<typeof clients.$inferSelect>(),
        404: z.object({ message: z.string() }),
      },
    },
  },
  alerts: {
    list: {
      method: 'GET' as const,
      path: '/api/alerts',
      responses: {
        200: z.array(z.custom<typeof alerts.$inferSelect>()),
      },
    },
  },
  activities: {
    list: {
      method: 'GET' as const,
      path: '/api/activities',
      responses: {
        200: z.array(z.custom<typeof activities.$inferSelect>()),
      },
    },
  },
  stats: {
    get: {
      method: 'GET' as const,
      path: '/api/stats',
      responses: {
        200: z.object({
          totalClients: z.number(),
          annualReviewsCompleted: z.number(),
          annualReviewsDue: z.number(),
          highRiskClients: z.number(),
          lifeEventsDetected: z.number(),
        }),
      },
    },
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

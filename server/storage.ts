import { users, clients, alerts, activities } from "@shared/schema";
import type { User, InsertUser, Client, Alert, Activity } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // WealthOS methods
  getClients(): Promise<Client[]>;
  getClient(id: number): Promise<Client | undefined>;
  getAlerts(): Promise<Alert[]>;
  getActivities(): Promise<Activity[]>;
  getStats(): Promise<{
    totalClients: number;
    annualReviewsCompleted: number;
    annualReviewsDue: number;
    highRiskClients: number;
    lifeEventsDetected: number;
  }>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private clients: Map<number, Client>;
  private alerts: Map<number, Alert>;
  private activities: Map<number, Activity>;
  private currentId: number;

  constructor() {
    this.users = new Map();
    this.clients = new Map();
    this.alerts = new Map();
    this.activities = new Map();
    this.currentId = 1;

    // Seed Data
    this.seedData();
  }

  private seedData() {
    // Generate 120 clients
    const firstNames = ["James", "Mary", "Robert", "Patricia", "John", "Jennifer", "Michael", "Linda", "David", "Elizabeth", "William", "Barbara", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah", "Charles", "Karen"];
    const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin"];
    const riskLevels = ["Low", "Medium", "High"];
    const reviewStatuses = ["Complete", "Due", "Overdue"];
    
    for (let i = 1; i <= 120; i++) {
      const fn = firstNames[Math.floor(Math.random() * firstNames.length)];
      const ln = lastNames[Math.floor(Math.random() * lastNames.length)];
      const risk = riskLevels[Math.floor(Math.random() * riskLevels.length)];
      const status = reviewStatuses[Math.floor(Math.random() * reviewStatuses.length)];
      const hasLifeEvent = Math.random() < 0.15;
      
      this.clients.set(i, {
        id: i,
        name: `${fn} ${ln}`,
        riskLevel: risk,
        reviewStatus: status,
        lifeEventFlag: hasLifeEvent,
        netWorth: `$${(Math.random() * 10 + 1).toFixed(1)}M`,
        primaryGoal: "Wealth Preservation",
        portfolioValue: `$${(Math.random() * 8 + 0.5).toFixed(1)}M`,
        lastContactDate: "2024-01-15",
        email: `${fn.toLowerCase()}.${ln.toLowerCase()}@example.com`
      });

      if (hasLifeEvent) {
        this.alerts.set(i, {
          id: i,
          clientId: i,
          clientName: `${fn} ${ln}`,
          eventType: ["Marriage", "Business Formation", "Property Transaction"][Math.floor(Math.random() * 3)],
          detectionSource: "Public Record",
          date: "2024-01-10",
          isRead: false
        });
      }

      this.activities.set(i, {
        id: i,
        clientId: i,
        clientName: `${fn} ${ln}`,
        activityType: "Annual Review Meeting",
        date: "2023-12-01",
        status: "Completed"
      });
    }
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getClients(): Promise<Client[]> {
    return Array.from(this.clients.values());
  }

  async getClient(id: number): Promise<Client | undefined> {
    return this.clients.get(id);
  }

  async getAlerts(): Promise<Alert[]> {
    return Array.from(this.alerts.values());
  }

  async getActivities(): Promise<Activity[]> {
    return Array.from(this.activities.values());
  }

  async getStats() {
    const clients = Array.from(this.clients.values());
    const alerts = Array.from(this.alerts.values());
    
    return {
      totalClients: clients.length,
      annualReviewsCompleted: clients.filter(c => c.reviewStatus === 'Complete').length,
      annualReviewsDue: clients.filter(c => c.reviewStatus === 'Due').length,
      highRiskClients: clients.filter(c => c.riskLevel === 'High').length,
      lifeEventsDetected: alerts.length
    };
  }
}

export const storage = new MemStorage();

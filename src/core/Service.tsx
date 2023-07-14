/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

import { LogCategory, Logger } from "./Logging";

// Global store to keep singleton references of services
// This store is NOT exposed to outside modules, use the Service's methods for that
let SERVICE_STORE : Map<string, Service>;

// General service class
class Service {
    // Returns the singleton instance of this service
    static get<ServiceType extends Service>(c : { new(): ServiceType }) : ServiceType  {
        // Check if the store is present
        if (!SERVICE_STORE) {
            SERVICE_STORE = new Map<string, Service>();
            Logger.info("Service store created");
        }

        // Check if the service is in the store
        const svcName = c.name;
        var svc : (Service | undefined) = SERVICE_STORE.get(svcName);
        if (!svc) {
            // Create a new service
            svc = new c();
            SERVICE_STORE.set(svcName, svc!);
            Logger.info(`Service \"${svcName}\" created`);
        }

        return svc as ServiceType;
    }
}

export { Service };

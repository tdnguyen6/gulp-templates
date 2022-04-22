import { Construct } from "constructs";
import { ApiObject, App, Chart, Helm } from "cdk8s";
import { Deployment, Service, ServicePortOptions,  } from "cdk8s-plus-21";

export class Vaultwarden extends Chart {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const deploy = new Deployment(this, "vaultwarden", {
      containers: [
        { image: "node2", port: 82 },
        { image: "node", port: 80 },
      ],
    });

    const deploy2 = new Deployment(this, "vaultwarden2", {
      containers: [
        { image: "node2", port: 82 },
        { image: "node", port: 80 },
      ],
    });

    const svc = new Service(this, "svc");
    for (const [k,v] of Object.entries(deploy.labelSelector))
      svc.addSelector(k, v)
      
    svc.serve(80, { targetPort: 80, name: "http1" });
    svc.serve(82, { targetPort: 82, name: "http2" });
  }
}

const app = new App({ outdir: `manifests` });
new Vaultwarden(app, "vaultwarden");
app.synth();

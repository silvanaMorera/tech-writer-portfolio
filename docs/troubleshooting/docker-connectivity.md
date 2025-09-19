---
id: docker-connectivity
title: Troubleshooting Docker Container Connectivity Issues
sidebar_label: Docker Connectivity
last_update:
  date: 2025-09-19
  author: Silvana Morera Claramunt
---

When running cloud native applications in Docker, connectivity issues are among the most common problems. This guide helps diagnose and resolve the most frequent causes.

---

## Symptoms

- Application cannot connect to the internet.
- `curl` or `ping` inside the container returns `Could not resolve host`.
- Services in one container cannot reach another container on the same host.

---

## Common Causes & Fixes

### 1. DNS Resolution Failure
**Cause**: Docker defaults to using Google DNS (`8.8.8.8`). If your environment blocks external DNS or has custom resolvers, lookups will fail.

**Fix**:  
Check DNS settings inside the container
```bash
cat /etc/resolv.conf
```

#### Override DNS on run
docker run --dns 1.1.1.1 alpine ping -c 3 google.com

:::tip Persistent Fix
Update /etc/docker/daemon.json:
```json
{
  "dns": ["1.1.1.1", "8.8.4.4"]
}
```
Restart Docker after changes.
:::

:::note Windows & Mac users
On Linux, Docker reads persistent settings from /etc/docker/daemon.json.

If you are using Docker Desktop on Windows or macOS, the configuration file may be in a different location or managed through the Docker Desktop UI.

- Windows: C:\ProgramData\Docker\config\daemon.json
- macOS: Use the Docker Desktop Preferences → Docker Engine tab to edit the JSON configuration.

Changes require restarting Docker Desktop.
:::

### 2. Bridge Network Misconfiguration
**Cause**: Containers on custom networks cannot talk to each other if not attached to the same network.

**Fix**:
```bash 
# List networks
docker network ls

# Attach container to a network
docker network connect my-network my-container

# Inspect settings
docker inspect my-container
```

### 3. Firewall Rules
**Cause**: Local firewall or cloud security groups may block container traffic.

**Fix**:
```bash 
# Check firewall rules
sudo iptables -L -n
```
Allow intra-container or required ports as needed.

### 4.Container Port Mapping
**Cause**: Host port not mapped to container port.

**Fix**:
```bash 
# Verify mapping
docker ps

# Restart container with proper mapping
docker run -p 8080:80 nginx
```

## Monitoring & Prevention 
Beyond manual troubleshooting, runtime visibility can accelerate root cause analysis:
Capture events: sysdig evt.type=connect
Create Falco rules to alert on unauthorized outbound connections
Monitor network metrics across Docker and Kubernetes clusters
:::note Why this matters
Adding runtime security and monitoring reduces downtime and improves visibility across containers.
:::
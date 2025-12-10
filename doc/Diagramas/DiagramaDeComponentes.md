# Diagrama de componentes

~~~mermaid
flowchart TB

%% ===== FRONTEND =====
subgraph Frontend["Frontend (React + Vite)"]
    WebApp["Componente UI\n(React App)"]
end

%% ===== API =====
subgraph API["Backend API (ASP.NET Core)"]
    Controllers["Controllers\n(Endpoints REST)"]
    Auth["Auth Middleware\n(JWT)"]
end

%% ===== CORE =====
subgraph Core["Core Layer (Dominio)"]
    CoreModels["Models"]
    CoreDTOs["DTOs"]
    CoreEnums["Enums"]
    CoreInterfaces["IServices\n(Interfaces)"]
end

%% ===== SERVICES =====
subgraph Services["Application Layer (Services)"]
    ServiceImpl["Servicios\n(Implementación)"]
end

%% ===== DATA =====
subgraph Data["Data Layer"]
    RepoInterfaces["IRepository"]
    RepoImpl["Repository Impl"]
    DbContext["DbContext / ORM"]
end

%% ===== DATABASE =====
subgraph Database["MySQL Server"]
    DB[("NetViTeca DB")]
end


%% ===== RELACIONES ORGANIZADAS =====

WebApp --> Controllers

Controllers --> Auth
Controllers --> CoreInterfaces

CoreInterfaces --> ServiceImpl

ServiceImpl --> CoreModels
ServiceImpl --> CoreDTOs
ServiceImpl --> CoreEnums

ServiceImpl --> RepoInterfaces
RepoInterfaces --> RepoImpl

RepoImpl --> DbContext
DbContext --> DB

~~~
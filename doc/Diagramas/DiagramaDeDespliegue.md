# Diagrama de despliegue
~~~mermaid
graph TD

    %% Nodos físicos / contenedores
    subgraph S1["Máquina Local (Servidor Físico)"]
        
        subgraph S2["Backend - ASP.NET Core"]
            API["<<component>> API REST"]
            JWT["<<component>> Módulo JWT (Auth)"]
            SRV["<<component>> Servicios (Lógica de negocio)"]
        end

        subgraph S3["Frontend - Vite + React"]
            WEB["<<artifact>> Aplicación Web"]
        end

        subgraph S4["Base de Datos - MySQL"]
            DB["<<database>> NetViTecaDB"]
        end

    end

    %% Conexiones
    WEB -->|HTTP / HTTPS| API
    API -->|Conexión MySQL| DB
    API -->|Validación JWT| JWT

~~~
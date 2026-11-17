# My Personal Portfolio

 ## Apply Database Migrations

Run the following commands from the **solution root directory**.

**Add a migration** (only if no migrations exist):

```powershell
dotnet ef migrations add Mig_1 --output-dir Infrastructure/Migrations
```

**Update the database:**

```powershell
dotnet ef database update 
```

**Drop the database:**

```powershell
dotnet ef database drop 
```

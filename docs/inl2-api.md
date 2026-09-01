# 🗂 Inl 2 - API️

## Information

- Betygsskala: IG/G/VG
- Deadline: fredagen den 18 september 2026 kl. 23.59
- Mål från kursplanen som examineras:
    - (4) Ta fram design och skapa API med Node.js
    - (5) Använda verktyg för att testa Node.js applikationer
    - (6) Planera och genomföra större databasdrivna programmeringsprojekt
- Inlämning:
    - Commit:a och pusha koden till ditt repo på GitHub. Verifiera att det du har på datorn även syns på GitHub.
    - Se till att repot är publikt och/eller bjud in användaren postmodernistx som en "collaborator" till repot.
    - Klistra in länken till repot på itslearning i inlämningsboxen.

## Uppgiftsbeskrivning

I den här uppgiften ska du skapa ett API (endast, ingen front end). Vilket tema du väljer är upp till dig.

Du lär dig att:

- Skapa ett API med Node.js
- Sätta upp testsviter i Node.js
- Skapa dokumentation för ett API

## Att göra

- Läs igenom bedömningsmallen för IG/G/VG innan du planerar ditt API!
- Kom på ett "tema" som du vill använda i ditt API
- Arbeta sedan testdrivet, dvs. med red-green-refactor-metoden.
- Implementera minst 1 av varje CRUD-operation.
- Det ska finnas möjlighet att filtrera/avgränsa datan.
    - Exempelvis om du gör ett API som returnerar karaktärer i Star Trek, så ska det gå att begränsa/filtrera på t.ex. /characters (alla), /characters/vulcans (endast Vulcans), characters/betazoids, osv.
    - Eller om du skulle göra ett väder-API så skulle man kunna få fram vädret för t.ex. /sverige/malmo eller /sverige/drangsmarksklappen.

## Kravlista

- Dokumentation av ditt REST API
- Alla CRUD-operationer ska finnas med
- I README:n ska det finnas instruktioner för hur man kommer igång med projektet
- En klasskamrat ska ha testat ditt API (lista kommer) och gjort en kodgranskning på ditt projekt
    - Bjud in klasskamraten till ditt repo som en collaborator (via Settings)
    - Lämna minst 3 st förbättringsförslag som en "issue" i repot
- Någon sorts datalagring. Det kan vara en JSON-fil eller en databas.

## 🖥️ Redovisning

- Ingen, men i samband med kursavslutningen får du gärna dela med dig av vad du valde för tema/länka till ditt API

## 📚 Resurser

- [No as a service](https://github.com/hotheadhacker/no-as-a-service) | [Exempel](https://naas.isalman.dev/no) (inspiration)
- Dokumentation
    - Scalar
    - REST API dokumentation i Node.js
    - Swagger | swagger-ui-express
    - Redoc
    - Postman

## Bedömningsexempel

### För IG

- Uppgiften följer inte kravspecifikationen

### För G

- Uppgiften följer kravspecifikationen
- API:et är dokumenterat i README:n
- Grundläggande felhantering per route, t.ex. om databasen inte är tillgänglig/korrupt

### För VG

- Utöver kraven för G…
- API:et är dokumenterat med ett externt verktyg/genererat
- Versionshistoriken i git följer (huvudsakligen) ett TDD-mönster:
    - Först test: add failing test for POST /items
    - Följt av feat: implement POST /items
- Input ska valideras och "rensas" (sanitaization), dvs. undvika skadlig kod
- Paginering: du ska ha med page=1, page=2 för att begränsa mängden data som returneras per anrop.
    - Hur mycket beror på ditt API, t.ex. kanske du returnerar 10 komplexa objekt eller 100 meningar.
    - Alternativt kan du lägga till en limit-parameter så att default är t.ex. 10, men det går att göra anrop som är t.ex. /characters/vulcans?limit=3 för att få fram 3 stycken.
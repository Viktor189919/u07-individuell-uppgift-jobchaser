[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/c1G8BKTh)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=17883239&assignment_repo_type=AssignmentRepo)

# u07-individuell-uppgift-JobChaser

# Teoretiska frågor

## Vecka 1

### Allmänt om ramverket React: Hur/Varför uppkom det? Vad är centralt i React?

React skapades av anställda på facebook. Syftet var att effektivisera och förenkla underhåll och utveckling av facebook samt förbättra prestandan.
De centrala delarna i React är komponenter, den virtuella DOM:en, JSX och one-way data binding.

### Vad är JSX?

JSX står för javascript XML och är en extension av javascript som också skapades av facebook för användning i React.
Det är ett syntaktiskt socker som möjliggör att skriva HTML liknande kod direkt i javascript. Det är alltså inte riktig HTML kod utan en syntax som berättar för React att det som skrivs i JSX ska göras om till DOM element vid körning.

### Vad är en komponent?

Det är grundstenen i React. I grunden är komponenter till för rendering av olika delar av en apps UI. Ofta returnerar en komponent ett eller flera HTML element, men så måste inte vara fallet. En komponents return värde kan i andra fall vara exempelvis en annan komponent eller ingenting beroende på villkoren i komponentens logik.
En komponent är en egen del av en UI. Den kapslar in relaterad UI och logik som är oberoende av omgivande komponenter i appen.

### Vad är props?

Props är, som namnet indikerar, properties och är argument som kan skickas till en komponent. Det är props som gör att man kan skräddarsy komponenter till det användningsområde man vill ha den till. De utgör skillnaden på en generisk och en specifik komponent.
Props kan i princip vad man vill primitiva och komplexa värden, funktioner, andra komponenter, etc. 

### Vad menas med one-way-dataflow?

Det innebär att data går från föräldraelement ner till barn, endast i den riktningen. Om data ska gå från barnelementet så måste det specificeras i föräldraelementet och barnet måste använda en callback som kommer från föräldern.

### Hur kan man använda sig av konditionell rendering i React?

Man kan till exempel använda villkor som avgör vad som ska returneras från en komponent.

### Vad menas med en återanvändbara komponent?

En väl utvecklad komponent är således en "generisk" komponent, en komponent som är så mångsidig som möjligt och kan återanvändas i flera sammanhang.
En generisk komponent tar in props som tillåter användaren av komponenten att anpassa den till just sitt sammanhang. 


## Vecka 2

### Vad är state i React?

State är ett sätt att spara data i en komponent. Det är ett värde som består över re-renderingar. Den initieras bara första gången den renderar komponenten och när statet ändras så kommer react ihåg värdet över kommande renderingar.
En komponent renderar varje gång state variabeln ändras.

### Vad är det för skillnad mellan state och props?

Props till skillnad mot state består inte i minnet. Om ett prop (om det inte är en state variabel) från en tidigare rendering byts ut mot ett annat så lagras inte den propen någonstans inför nästa rendering.

### Vad menas med en kontrollerad komponent i React?

En kontrollerad komponent i react är en där input från ett form lagras i en state variabel.

### Vad är en callback handler?

Den är en callback function som kan skickas som en prop till ett barn från en förälder. Det tillåter barnet att använda funktioner som är deklarerade i föräldern. 

### Vad menas med "lifting state up"?

Det betyder att man flyttar en state variabel uppåt i "trädet", från barn till förälder. Det görs ex. om ett state som är satt i en barnkomponent behöver påverka andra barn till föräldern som det flyttas upp till. Den sätts i en gemensam förälder. 

### Vad är syftet med useEffect-hook i React?

Det är att hantera sido-effekter under vissa omständigheter. Används ofta i samband med state variabler då en useEffect kan köras varje gång ett state ändras. Används också ofta med api requests. Då kan man bestämma att useEffecten ska köras första gången en komponent renderar. 

### Vad är syftet med den s.k dependency-arrayen i useEffect?

Där i kan man specificera när useEffect ska köras. Vid en tom array "[]" så körs den första gången en komponent renderar. 
Om useEffecten ska köras beroende på en state variabel så sätter man variablen inuti arrayen "[stateVariable]".

## Vecka 3

### Vilka fördelar finns det med att använda NextJS? Nackdelar?

Server-side rendering:
Man kan använda next för att rendera en html sida på servern istället för i browsern. Detta kan förbättra prestandan och generera UI snabbare för användaren.

### Vad menas med Routing? På vilket sätt löser NextJS Routing vs "vanliga React"?

Routing i webbutveckling är de metoder som avgör vart en http förfrågan ska skickas. Routes är olika vägar som kan tas i en applikation. Ex. så kan routes på en hemsida vara "home", "about", etc. Routes är förknippade med en specifik url-ändelse. Med exemplen home och about så skulle ändelser kunna vara just /home och /about.
NextJS använder sig av fil-baserad routing där olika filer står för olika sidor av en hemsida. Dessa hanteras direkt av Next genom själva filstrukturen.
React använder sig istället av ett bibliotek kallad Browser Router där en "route"-komponent måste deklareras. Man definierar en route och nästlar den komponent som ska tillhöra den routen.

### Vad menas med Reacts ekosystem? Nämn några viktig bibliotek i Reacts ekosystem.

Det är alla samlade verktyg, bibliotek och ramverk som är byggda ovanpå react.
Populära bibliotek är shadcn, react hook form, chakra, bootstrap mm.

### Vad är syftet med useContext? Vilket problem med props löser den?

Det är ett verktyg i react för att kunna skapa globala tllstånd. En kontext wrappas runt de komponenter som ska ha tillgång till den och komponenterna kan då "kalla" på kontexten genom useContext direkt i komponenten. Om man skulle använda useState så måste statet skickas till komponenten som en prop från en parent. Kontext förenklar åtkomst av state. 

## Vecka 4

### Vad är Redux Toolkit? 

Redux är ett bibliotek för att hantera globala tillstånd i en applikaton.
Toolkit är i sin tur en samling verktyg för standarisering av hanteringen av globala tillstånd. Den minskar boilerplate kod som förenklar användning.

## När, i vilka situationer vill man använda Redux Toolkit?

Redux är utformat för att underlätta hantering när man har flera olika, ofta komplexa tillstånd. Man kan samla funktionalitet i en reducer, kallad "slice". Dessa olika slices är i sin tur samlade i en fil kallad store vilken använder sig av en provider för att ge komponenter tillgång slices och dess tillstånd och metoder.
Således så kan Redux först visa sin fulla styrka när applikationer växer. I mindre applikationer kan det vara överflödigt då tillstånd och metoder är få till antalet och kan hanteras lika väl med verktyg som useState, useContext, useReducer, mm.
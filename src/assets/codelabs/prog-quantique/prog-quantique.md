---
title: Programmation quantique
---

--sep--
---
title: Introduction
---

# Microsoft Dev Roadshow - Programmation Quantique

## Introduction

Vous allez réaliser le kata de l'algorithme [DeutschJoszaAlgorihtm](https://github.com/microsoft/QuantumKatas/tree/master/DeutschJozsaAlgorithm)

Ce kata peut être réalisé sans installation d’un environnement en utilisant Binder. Le matériel requis se limite à une machine et une connexion internet. Il est également possible de réaliser le kata localement en utilisant un jupyter notebook. Cela permet d’avoir une syntaxe colorée. On privilégiera l’utilisation de Binder.

## Pré-requis

Afin de réaliser ce workshop, vous aurez besoin: 

- D'un ordinateur avec un navigateur internet
- Et c'est tout !

Des compétences basiques sur les [portes logiques](https://fr.wikipedia.org/wiki/Fonction_logique) sont recommandées

--sep--
---
title: Objectif du workshop
---

## Objectif du workshop

Ce workshop, accessible à **tous les développeurs même sans connaissance en programmation quantique**, vous permettra de comprendre les principes de base de la programmation quantique à travers un exemple simple.

L'algorithme de Deutsch-Jozsa n'a aucun usage pratique mais est connu pour être un des premiers exemple d'algorithme quantique potentiellement plus rapide qu'aucun algorithme deterministe classique.

Pour en apprendre plus :
* Un bon endroit pour commencer est [wikipedia](https://fr.wikipedia.org/wiki/Algorithme_de_Deutsch-Jozsa).
* Nielsen, M. A. & Chuang, I. L. (2010). Quantum Computation and Quantum Information. pp. 34-36
* [Lecture 5: A simple searching algorithm; the Deutsch-Jozsa algorithm](https://cs.uwaterloo.ca/~watrous/CPSC519/LectureNotes/05.pdf).


## Instructions

Allez sur [le repo GitHub](https://github.com/microsoft/QuantumKatas/tree/master/DeutschJozsaAlgorithm) du kata et lancez le jupyter Notebook en cliquant sur le 1er lien du Readme.

Suivez les instructions en remplissant les zones de code. Pour valider une étape, cliquez sur l'îcone ```step forward``` à gauche du champ ou utilisez la combinaison de touche ```Ctrl + Enter```.
L'output de votre code apparaitra en dessous du champ.

--sep--
---
title: Aide au kata - Part 1
---

# Aide au kata - Part 1

Vous trouverez ci-dessous des tips et des liens vers des ressources pour vous aider à faire ce kata.


## Task 1.2

Vous pouvez aller consulter la liste des portes élémentaires [ici](https://docs.microsoft.com/en-us/qsharp/api/qsharp/microsoft.quantum.intrinsic?oicd=WTMCID)

Allez regarder du côté de la porte X.


## Task 1.3

Allez regarder du côté de la porte CNOT


## Tasks 1.4 et 1.5

Allez vous documenter sur comment faire une boucle ```for``` et une condition ```if``` en Q# [ici](https://docs.microsoft.com/en-us/quantum/user-guide/using-qsharp/control-flow?oicd=WTMCID)

## Tasks 1.7 et 1.8

**Passez ces étapes. Vous pourrez y revenir si vous avez fini le kata en avance.**

* Sélection d’un sous-registre de qubits
Allez jeter un coup d'oeil au paragraphe [Array slices](https://docs.microsoft.com/en-us/quantum/user-guide/language/expressions#array-expressions?oicd=WTMCID).

Pour définir le sous-array de l’array ‘myArray’ dont les indices sont compris entre ‘start’ et ‘stop’, on utilise la syntaxe suivante :

```csharp
let myArray = [10, 11, 12, 13, 14, 15];
let start = 1;
let stop = 3;
let mySubarray = myArray[start .. stop]; //  mySubarray = [11, 12, 13].
```


* Porte multi-contrôlée
Allez jeter un coup d'oeil au paragraphe [Controlled functor](https://docs.microsoft.com/en-us/quantum/user-guide/using-qsharp/operations-functions?oicd=WTMCID).

Controlled X ([controls], target) implémente la porte X au qubit target lorsque tous les qubits controls sont dans l’état 1.

Contrôler une porte ```U``` sur un ou plusieurs qubits de contrôle ```[controlQubits]``` permet d’appliquer cette porte au qubit cible ```targetQubit``` si et sulement si tous les qubits de contrôle sont dans l’état |1>. C’est d’une certaine façon l’analogue quantique d’un ```if``` classique. On utilise la syntaxe suivante :

```csharp
Controlled U ([controlQubits], targetQubit);
```

```[controlledQubits]``` est un array de qubits. ```targetQubit```  est un qubit.


--sep--
---
title: Aide au kata - Part 2
---

## Task 2.1

Vous pouvez aller consulter la liste des portes élémentaires [ici](https://docs.microsoft.com/en-us/qsharp/api/qsharp/microsoft.quantum.intrinsic?oicd=WTMCID)

Allez regarder du côté de la porte H.


## Task 2.2

### Variables mutables

Vous pouvez aller consulter la documentation des variables mutables [ici](https://docs.microsoft.com/en-us/quantum/user-guide/using-qsharp/variables#mutable-variables?oicd=WTMCID).

Les variables déclarées sous la forme :

```csharp
let myImmutableVariable = 2 ;
```
sont immuables.

Pour les variables mutables, on utilise les mots-clés ```mutable``` pour la déclaration et ```set``` pour la modification :

```csharp
mutable myMutableVariable = 4 ;
set myMutableVariable = 3 
```

### Mesures

Vous pouvez aller consulter la documentation pour savoir comment mesurer les qbits [ici](https://docs.microsoft.com/en-us/quantum/user-guide/using-qsharp/working-with-qubits#measurements?oicd=WTMCID).

Une mesure est faite à l’aide de l’opération M() :
```csharp
let myResult = M(qubit);
```
```myResult``` est alors de type ```Result```. Le type ```Result``` est constitué de deux valeurs : ```Zero``` et ```One```. 


### Reset

Après avoir manipulé des qubits, il est nécessaire de les remettre à Zéro avant de les libérer. On utilise pour ça la fonction Reset :
```csharp
Reset(qubit);
```
Pour un array de qubits, on peut également utiliser la fonction ResetAll :
```csharp
ResetAll(qubitArray);
```

--sep--
---
title: Aide au kata - Part 3
---

## Task 1.3

### Array mutable

Pour déclarer un array mutable, on peut utiliser la syntaxe suivante :
```csharp
mutable myArray = new Int[0];
```

On déclare ainsi un array de longueur 0 (donc vide). Pour ajouter une valeur à cet array, on utilise la syntaxe suivante :
```csharp
myArray += [myNewValue];
```

### Copy & Update

Vous pouvez aller voir le paragraphe Copy & Update Expressions de la documentation [ici](https://docs.microsoft.com/en-us/quantum/user-guide/language/expressions#array-expressions?oicd=WTMCID)

Pour modifier une valeur d’un array, on utilise la syntaxe suivante :
```csharp
myArray w/= myIndex <- myNewValue;
```
La valeur située en position ```myIndex``` de ```myArray``` devient alors ```myNewValue```. 


--sep--
---
title: Conclusion
---

# Conclusion

Bravo, vous avez fini le workshop!

Vous pouvez continuer à approfondir la programmation quantique en allant voir [les autres katas](https://github.com/microsoft/QuantumKatas/tree/master)

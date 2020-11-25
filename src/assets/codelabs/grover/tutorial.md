---
title: Hackathon quantique
---

--sep--
---
title: Introduction
---

# QuantX - Hackathon quantique

## Introduction

Vous allez réaliser les katas [GroversAlgorithm](https://github.com/microsoft/QuantumKatas/tree/main/GroversAlgorithm) et [SolveSATWithGrover](https://github.com/microsoft/QuantumKatas/tree/main/SolveSATWithGrover).

Ces katas peuvent être réalisés localement en utilisant un jupyter notebook. Cela nécessite d'installer miniconda (ou Anaconda). L'installation de l'environnement est détaillée sur la page Préparation.

Il est également possible de réaliser les kata entièrement en ligne (donc sans installation) en utilisant Binder. Néanmoins on privilégiera l'installation locale qui permet d'exécuter le code Q# plus rapidement et de ne pas risquer de voir sa connexion interrompue.

## Pré-requis

Afin de réaliser ce Hackathon, vous aurez besoin:

- D'un ordinateur avec un navigateur internet
- D'une connexion internet
- Et c'est tout !

Des compétences basiques sur les [portes logiques](https://fr.wikipedia.org/wiki/Fonction_logique) peuvent être utiles.

--sep--
---
title: Objectif du hackathon
---

## Objectif du hackathon

Ce hackathon, **qui ne nécessite pas de connaissances préalables en programmation quantique**, vous permettra d'appliquer l'un des algorithmes quantiques les plus fondamentaux (l'algorithme de Grover) à la **résolution d'un problème concret** et utile dans de nombreux domaines. L'algorithme de Grover est à l'origine d'un grand nombre d'algorithmes quantiques encore plus sophistiqués et pouvant être vus comme des généralisations de Grover. 

--sep--
---
title: Préparation
---

## Préparation

### Faire le workshop en local

Si vous n'avez pas déjà installé une distribution Anaconda, installez miniconda : <a href="https://docs.conda.io/en/latest/miniconda.html" target="_blank">https://docs.conda.io/en/latest/miniconda.html</a>.

Ouvrez un prompt miniconda (ou Anaconda).

Créez un nouvel environnement Conda appelé ```qsharp-dev``` avec les packages requis (notamment Jupyter Notebook et IQ#) :
```bash
conda create -n qsharp-env -c quantum-engineering qsharp notebook

conda activate qsharp-env
```

Lancez la commande suivante dans le même terminal :
```bash
python -c "import qsharp"
```

Bravo ! Vous avez maintenant le kernel IQ# et Jupyter qui vous fournissent les fonctionnalités de base pour compiler et lancer des opérations Q# depuis un Jupyter Notebook Q#.

<a href="/workshops/assets/codelabs/Grover/GroversAlgorithm.zip" target="_blank">Téléchargez le kata GroversAlgorithm</a> (si le lien ne fonctionne pas, cliquez directement à gauche dans la partie RESOURCES)

Décompressez le fichier et naviguez jusqu'au dossier dans votre terminal Conda.

Lancez le jupyter notebook :

```bash
jupyter notebook GroversAlgorithm.ipynb
```

### C'est parti !
Suivez les instructions en remplissant les zones de code. Pour valider une étape, cliquez sur l'îcone ```step forward``` à gauche du champ ou utilisez la combinaison de touche ```Ctrl + Enter```.
L'output de votre code apparaitra en dessous du champ.

Une fois le kata GroversAlgorithm terminé, vous pouvez attaquer le kata SolveSATWithGrover:

<a href="/workshops/assets/codelabs/Grover/SolveSATWithGrover.zip" target="_blank">Téléchargez le kata SolveSATWithGrover</a> (si le lien ne fonctionne pas, cliquez directement à gauche dans la partie RESOURCES)


### Alternative: faire les katas en ligne

Rendez vous sur le repo Github du kata GroversAlgorithm <a href="https://github.com/microsoft/QuantumKatas/tree/main/GroversAlgorithm" target="_blank">ici</a>.

Cliquez ensuite sur le lien run the GroversAlgorihtm kata as a Jupyter Notebook!

Une fois le kata GroversAlgorithm terminé, vous pouvez attaquer le kata SolveSATwithGrover <a href="https://github.com/microsoft/QuantumKatas/tree/main/SolveSATWithGrover" target="_blank">ici</a>.

Cliquez ensuite sur le lien run the SolveSATWithGrover kata as a Jupyter Notebook!


--sep--
---
title: GroversAlgorithm - aide
---

# GroversAlgorithm : aide

Vous trouverez ci-dessous des tips et des liens vers des ressources pour vous aider à faire ce kata.

## Taks 1.1

En Q# une opération est une procédure qui peut manipuler de la mémoire quantique (des qubits). Le type de chaque argument est donné après le symbole `:` suivant chaque nom de variable. Ici la variable `queryRegister` est donc un tableau de qubits et la variable `target` est un qubit. Le dernier type donné (ici `Unit`) est celui renvoyé par l'opération. Ici `Unit` signifie que l'opération ne renvoie rien. C'est l'équivalent de `void` dans d'autres languages. On se passera donc du mot-clé `return` pour cette opération. `is Adj` signifie qu'on peut automatiquement générer l'opération 'adjointe' (on dit aussi l'opération inverse). On peut ne pas s'en occuper dans un premier temps.

Une opération qui ne renvoie rien n'est pas forcément inutile car la manipulation de la mémoire quantique se fait sur place, par effet de bord. Ici par exemple l'opération `Oracle_AllOnes` va modifier l'état (i.e. la valeur interne) du qubit `target`.

Vous aurez besoin de la [porte quantique **X**](https://en.wikipedia.org/wiki/Quantum_logic_gate#Pauli-X_gate), équivalent quantique d'une porte **NOT**. Vous aurez également besoin du [foncteur **Controlled**](https://docs.microsoft.com/en-us/quantum/user-guide/using-qsharp/operations-functions#controlled-and-adjoint-operations):

Contrôler une porte quantique **U** par un ou plusieurs qubits de contrôle ```[controlQubits]``` permet d’appliquer cette porte au qubit cible ```targetQubit``` si et seulement si tous les qubits de contrôle sont dans l’état |1>. C’est d’une certaine façon l’analogue quantique d’un ```if``` classique. On utilise la syntaxe suivante :


```csharp
Controlled U ([controlQubits], targetQubit);
```

```[controlledQubits]``` est un tableau de qubits. ```targetQubit```  est un qubit.


## Task 1.2

Le foncteur **Controlled** permet d'exprimer la condition que tous les qubits de contrôle sont dans l'état |1>. Il n'existe pas de syntaxe permettant d'exprimer nativement une autre condition. Il faut donc se ramener au cas où tous les qubits de contrôle sont dans l'état |1> en modifiant la valeur des qubits de contrôle avant (et après!) l'utilisation du foncteur **Controlled**.

Vous pouvez vous documenter sur comment faire une boucle ```for``` et une condition ```if``` en Q# [ici](https://docs.microsoft.com/en-us/quantum/user-guide/using-qsharp/control-flow?oicd=WTMCID)

*Bonus:* pour un code élégant et concis, je vous recommande la syntaxe [**within {..} apply {..}**](https://docs.microsoft.com/en-us/quantum/user-guide/using-qsharp/control-flow#conjugations).

## Tasks 1.4

Cette procédure ne manipule pas de qubits. C'est pourquoi il s'agit en Q# d'une fonction et non pas d'une opération. Cette fonction transforme l'opération `markingOracle` en une autre opération qu'on peut appeler `phaseOracle`. On utilise la syntaxe [**return**](https://docs.microsoft.com/en-us/quantum/user-guide/using-qsharp/control-flow?view=qsharp-preview#return-statement).

Une étape intermédiaire peut être d'écrire d'abord une opération `OracleConverterWithQubitRegister` qui prend en arguments le `markingOracle` et un tableau de qubits `register` et implémente le `phaseOracle` à `register`. On aura besoin de manipuler un qubit supplémentaire au sein de `OracleConverterWithQubitRegister`. La syntaxe pour déclarer de la mémoire quantique (des qubits) est [**using**](https://docs.microsoft.com/en-us/quantum/user-guide/using-qsharp/working-with-qubits?view=qsharp-preview#allocating-qubits). Vous aurez également besoin de la [porte quantique de Hadamard (**H**)](https://en.wikipedia.org/wiki/Quantum_logic_gate#Hadamard_(H)_gate) et de la [porte quantique **X**](https://en.wikipedia.org/wiki/Quantum_logic_gate#Pauli-X_gate). Pour appliquer les portes **X** et **H** à `qubit` on utilise en Q# la syntaxe suivante:
```csharp
X(qubit);
H(qubit);
```

Pour écrire la fonction `OracleConverter`, on peut se servir de la possibilité en Q# de définir des [opérations partielles](https://docs.microsoft.com/en-us/quantum/user-guide/using-qsharp/operations-functions?view=qsharp-preview#partial-application).

## Task 2.1

la [porte quantique **H**](https://en.wikipedia.org/wiki/Quantum_logic_gate#Hadamard_(H)_gate) permet de créer un état de superposition à partir des états de base |0> et |1>.


## Task 2.2

Selon l'implémentation choisie, les syntaxes suivantes peuvent être utiles:
- le foncteur [**Controlled**](https://docs.microsoft.com/en-us/quantum/user-guide/using-qsharp/operations-functions#controlled-and-adjoint-operations).
- la [porte quantique **Z**](https://en.wikipedia.org/wiki/Quantum_logic_gate#Pauli-Z_(%7F'%22%60UNIQ--postMath-00000028-QINU%60%22'%7F)_gate).
- les fonctions [**Most**](https://docs.microsoft.com/en-us/qsharp/api/qsharp/microsoft.quantum.arrays.most) et [**Tail**](https://docs.microsoft.com/en-us/qsharp/api/qsharp/microsoft.quantum.arrays.tail).

## Task 2.3

Appliquer une transformation de Hadamard consiste à appliquer une porte de Hadamard (**H**) à chaque qubit.

## Task 3.1

Cet [article Wikipédia](https://en.wikipedia.org/wiki/Grover%27s_algorithm) décrit l'algorithme de Grover.

## Task 3.2

- La fonction **Message** utilise la syntaxe suivante:
```csharp
Message ("texte à afficher");
```

- Une mesure est faite à l’aide de l’opération M() :
```csharp
let myResult = M(qubit);
```

`myResult` est alors de type `Result`. Le type `Result` est constitué de deux valeurs : `Zero` et `One`. 
Vous pouvez aller consulter [ici](https://docs.microsoft.com/en-us/quantum/user-guide/using-qsharp/working-with-qubits#measurements) la documentation sur la mesure quantique en Q#.
La fonction [MultiM](https://docs.microsoft.com/en-us/qsharp/api/qsharp/microsoft.quantum.measurement.multim) permet de mesurer directement un array de qubits.


--sep--
---
title: SolveSATWithGrover - aide
---

## Task 1.1

Il est courant de devoir appliquer le foncteur **Controlled** à la porte X. Lorsque le contrôle ne se fait que sur 1 qubit ou sur 2 qubits, il existe un raccourci syntaxique:
- contrôle sur 1 qubit:
  
```csharp
CNOT(controlQubit, targetQubit);
```
est strictement équivalent à 
```csharp
Controlled X ([controlQubit], targetQubit);
```
- contrôle sur 2 qubits:
  
```csharp
CCNOT(FirstControlQubit, SecondControlQubit, targetQubit);
```
est strictement équivalent à 
```csharp
Controlled X ([FirstControlQubit, SecondControlQubit], targetQubit);
```

## Task 1.2

Pensez à utiliser la syntaxe [**within {..} apply {..}**](https://docs.microsoft.com/en-us/quantum/user-guide/using-qsharp/control-flow#conjugations).

## Task 1.4

- Sélection d’un sous-registre de qubits
Pour définir le sous-array de l’array `myArray` dont les indices sont compris entre `start` et `stop`, on utilise la syntaxe suivante :

```csharp
let myArray = [10, 11, 12, 13, 14, 15];
let start = 1;
let stop = 3;
let mySubarray = myArray[start .. stop]; //  mySubarray = [11, 12, 13].
```

Pour plus d'informations vous pouvez aller voir le paragraphe [Array slices](https://docs.microsoft.com/en-us/quantum/user-guide/language/expressions#array-expressions).

- La fonction **Length** renvoie la longueur d'un array:
  
```csharp
let N = Length(myArray);
```

## Task 1.5

### Variables mutables

Les variables déclarées sous la forme :

```csharp
let myImmutableVariable = 2;
```
sont immutables.

Pour les variables mutables, on utilise les mots-clés `mutable` pour la déclaration et `set` pour la modification :

```csharp
mutable myMutableVariable = 4 ;
set myMutableVariable = 3;
```
Vous pouvez aller consulter la documentation des variables mutables [ici](https://docs.microsoft.com/en-us/quantum/user-guide/using-qsharp/variables#mutable-variables).

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

Pour modifier une valeur d’un array, on utilise la syntaxe suivante :
```csharp
myArray w/= myIndex <- myNewValue;
```
La valeur située en position `myIndex` de `myArray` devient alors `myNewValue`. 

Vous pouvez aller voir le paragraphe Copy & Update Expressions de la documentation [ici](https://docs.microsoft.com/en-us/quantum/user-guide/language/expressions#array-expressions).


## Task 3.2

Après avoir manipulé des qubits, il est nécessaire de les remettre dans l'état |0> avant de les libérer. On utilise pour ça la fonction Reset :
```csharp
Reset(qubit);
```
Pour un array de qubits, on peut également utiliser la fonction ResetAll :
```csharp
ResetAll(qubitArray);
```

--sep--
---
title: Conclusion
---

# Conclusion

Bravo, vous avez fini!

Vous pouvez continuer à approfondir la programmation quantique en allant voir [les autres katas](https://github.com/microsoft/QuantumKatas/tree/master).

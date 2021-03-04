---
title: Quantum Hackathon
---

--sep--
---
title: Introduction
---

# QuantX - Quantum Hackathon

## Introduction

You are about to solve the katas **GroversAlgorithm** and **SolveSATWithGrover**.

If you prefer, you can run these katas locally with a jupyter notebook. If you choose this option, you need to have installed miniconda (or Anaconda). See *Preparation* for detailed instructions on the installation of such a local environment.

Otherwise it is possible to run these katas entirely online by leveraging Binder. No installation needed in this case. Please favor the local installation for a faster execution and to avoid connexion issues.


## Prerequisites

For this Hackathon, you will need:

- A browser
- An internet connexion
- And that's it !

Basic knowledge of [logic gates](https://en.wikipedia.org/wiki/Logic_gate) can be useful.

--sep--
---
title: Objectives of the Hackathon
---

## Objectif of the Hackathon

This Hackathon **doesn't assume any prior knowledge on Quantum Computing**. First, you will rediscover one of the most fundamental quantum algorithms : Grover's algorithm. Grover's algorithm has been generalised in many different directions : quantum walks, quantum singular value transformation .. It's a great foundation to build upon in order to understand quantum algorithmss.

Second, you will use Grover's quantum algorithm to **solve a concrete problem** : the satisfiability problem (SAT). SAT solvers are used in many different domains, for example circuit design and automatic theorem proving.

--sep--
---
title: Preparation
---

## Preparation

### First option : local installation

* If you haven't already installed an Anaconda distribution, you can install miniconda here : <a href="https://docs.conda.io/en/latest/miniconda.html" target="_blank">https://docs.conda.io/en/latest/miniconda.html</a>.

* Open a miniconda (or Anaconda) prompt.

* Create and activate a new conda environment named ```qsharp-env``` with the required packages (including Jupyter Notebook and IQ#) by running the following commands:

```bash
conda create -n qsharp-env -c quantum-engineering qsharp notebook

conda activate qsharp-env
```

* To populate your local package cache with all required QDK components, run the following command from the same terminal :

```bash
python -c "import qsharp"
```

You now have the IQ# kernel for Jupyter, which provides the core functionality for compiling and running Q# operations from Q# Jupyter Notebooks.

* <a href="/workshops/assets/codelabs/grover/GroversAlgorithm.zip" target="_blank">Download the kata GroversAlgorithm</a> (if the link is down, please click directly on "jupyter notebook GroversAlgorithm" on the left hand side of this page in the RESOURCES section.)

* Unzip the file and navigate to the unzipped folder in your cConda terminal.

Décompressez le fichier et naviguez jusqu'au dossier dans votre terminal Conda.

* Run the jupyter notebook :

```bash
jupyter notebook GroversAlgorithm.ipynb
```

### That's it !
Follow the instructions of the jupyter notebook. To validate a step, click on ```step forward``` on the left or use the key combination ```Ctrl + Enter```.
Your code output will appear below.

Once you have completed the GroversAlgorithm kata, you can follow-up with the SolveSATWithGrover kata:

<a href="/workshops/assets/codelabs/grover/SolveSATWithGrover.zip" target="_blank">Download the kata SolveSATWithGrover</a> (if the link is down, please click directly on "jupyter notebook GroversAlgorithm" on the left hand side of this page in the RESOURCES section.)


### Alternative : run the katas online

Go to the <a href="https://github.com/microsoft/QuantumKatas/tree/main/GroversAlgorithm" target="_blank">Githhub repo</a> of GroversAlgorithm kata.

Then click on the link : *run the GroversAlgorihtm kata as a Jupyter Notebook*.

Once you have completed the GroversAlgorithm kata, you can follow-up with the <a href="https://github.com/microsoft/QuantumKatas/tree/main/SolveSATWithGrover" target="_blank">SolveSATWithGrover</a> kata.

Then click on the link : *run the SolveSATWithGrover kata as a Jupyter Notebook*.


--sep--
---
title: GroversAlgorithm - help
---

# GroversAlgorithm : help

Here you will find tips and links to help you solve this kata.

## Taks 1.1

In Q#, an operation is a procedure that can process quantum memory (qubits). The type of each argument is given after the symbol `:` that follows the name of each variable. Here the variable `queryRegister` is hence a qubit array and the variable `target` is a qubit. The last given type (here: `Unit`) is the type of the object returned by the operation. Here `Unit` means that the operation returns nothing. It is similar to `void` in other languages. Therefore this operation doesn't make use of the key-word `return`. `is Adj` means that it is possible to automatically generate the 'adjoint' operation (i.e. the inverse operation). Let's not worry about it for now.

An operation that returns noting (whise output type is `Unit`) is not useless since quantum memory processing happens in place : it is a side-effect of the operation. Here for instance, the operation `Oracle_AllOnes` modifies the state (i.e. the internal value) of the qubit `target`.

You will need the [quantum gate **X**](https://en.wikipedia.org/wiki/Quantum_logic_gate#Pauli-X_gate), the quantum equivalent of a **NOT** gate. You will also need the [**Controlled** functor](https://docs.microsoft.com/en-us/azure/quantum/user-guide/language/expressions/functorapplication#controlled-functor).

Controlling a quantum operation **U** by an array of control qubits ```[controlQubits]``` amounts to applying **U** to ```targetQubit``` if and only if every qubit of the control array are in the state |1>. It is somewhat similar to a classical ```if```. It follows the following syntax :


```csharp
Controlled U ([controlQubits], targetQubit);
```

```[controlledQubits]``` is an array of qubits. ```targetQubit```  is a qubit.


## Task 1.2

The **Controlled** functor expresses the condition that all the contol qubits are in the state |1>. There is no Q# native syntax to express an other condition, such as some control qubits are in the state |0> and others are in the state |1>. It is therefore necessary to reduce to the all |1> case by modifying the value of the control qubits before (and after!) applying the **Controlled** operation.

Look here for documentation about [```for``` loops](https://docs.microsoft.com/en-us/azure/quantum/user-guide/language/statements/iterations?oicd=WTMCID) and classical [```if``` conditions](https://docs.microsoft.com/en-us/azure/quantum/user-guide/language/statements/conditionalbranching).

*Bonus:* For a nice and concise code, I recommend the [**within {..} apply {..}**](https://docs.microsoft.com/en-us/quantum/user-guide/using-qsharp/control-flow#conjugations) syntax.

## Tasks 1.4

This procedure doesn't process qubits. Therefore it is expressed in Q# by a function and not an operation. This function transforms the operation `markingOracle` into another operation that we may call `phaseOracle`. The [**return**](https://docs.microsoft.com/en-us/azure/quantum/user-guide/language/statements/returnsandtermination?view=qsharp-preview) syntax is used.

An intermediate step can be to write an operation `OracleConverterWithQubitRegister`
first. `OracleConverterWithQubitRegister` takes two arguments : the oracle `markingOracle` and a qubit array `register`. It applies the `phaseOracle` to `register`. An additional qubit is necessary in the body of `OracleConverterWithQubitRegister`. To declare and use quantum memory (qubits), the keyword is [**use**](https://docs.microsoft.com/en-us/quantum/user-guide/using-qsharp/working-with-qubits?view=qsharp-preview#allocating-qubits). Vous aurez également besoin de la [porte quantique de Hadamard (**H**)](https://en.wikipedia.org/wiki/Quantum_logic_gate#Hadamard_(H)_gate) et de la [porte quantique **X**](https://en.wikipedia.org/wiki/Quantum_logic_gate#Pauli-X_gate). Pour appliquer les portes **X** et **H** à `qubit` on utilise en Q# la syntaxe suivante:
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

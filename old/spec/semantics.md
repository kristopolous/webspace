
# VizShapes Semantics

 * Version 0.0
 * Created January 2013
 * Authors: 
	Chris McKenzie (chrism@vizcommunication.com)
	Ray Emrani (ray@vizcommunication.com)
 
# Purpose

To constrict and abstract graphical representation of information to a structured format and syntax isomorphic to linguistic human languages. It is declarative, generic, and source-language agnostic with foundations in educational psychology and formal logic.

Information constructed through these rulesets by hand in the practice of private tutoring have dramatically increased the comprehension, recall, and coverage of a topic and on average helps failing students go to "B level" marks or better in the subject matter. 

This pattern is expected to hold true across a large percentage of people who have found difficulty in successfully leveraging other methodologies of displaying information with the purpose of learning.

It is achieved by helping to helping alleviate the task of mental bookkeeping where someone has to internalize dynamic structures of vastly new content.

There are separate documents which concern themselves further with the theory, benefits, and implications of effectively using the grammar outlined here.  This document is intended to be a formal introduction to the lexical properties of the language.

# Graph properties

The graph is 

 * directional
 * a hypergraph
 * can be deterministically walked
 * may have cycles (but they are not common)

Furthermore, the nodes and edges can be categorized into a limited set of types which cover most forms of declarative narratives that are used for educational purposes.

One additional important property is that there is complete coverage of content. That is to say that all text, graphics, diagrams, formulas, and other types of information are represented in their totality.  In other words, one could ostensibly replace a traditional text with this graph; it does not necessarily just exist as a supplemental aid.

Graphs ultimately have a single root node and exist in containers referred to as *Documents*.

# VizShapes

All VizShapes have content. The content of a VizShape is ideally two sentences or under if text. Otherwise it can be, ideally, a single multi-media source. It is best practice to restrict the various types of VizShapes to specific grammatical constructs. Content is often a sentence fragment.

All VizShapes are nestable. Generally speaking Category VizShapes should come prior to Description VizShapes. Description VizShapes should come prior to Content VizShapes with respect to the depth of the graph.

## VizShape Types

### Category

Categories are root VizShapes and facilitate the purpose of being topics or sub-topics.  They are linguistically similar to headings and sub-headings, respectively and operationally are best as nouns.

#### Examples

 * The topic of a document, such as "Human" or "Triangle".
 * The sub-topic of a document, such "Cells" for "Human" or "Equilateral" for "Triangle".
 
#### Representation

Categories may be depicted by a distinctive border and background and be given prominent location in the document's visual space. A larger point-size or more heavily weighted font to contrast with the rest of the content is appropriate.

### Description

Descriptions are the core declarative prose that accompany a Category.  Intros, Asides, Paths, and Procedures can be viewed as beta reductions of a generic description where descriptions are a generic classifier when nothing else is suitable.

This does not imply that Descriptions ought to be treated non-preferentially. Indeed, the majority of content is most suitably contained as content fragments in Description nodes.

Descriptions are often nested hierarchically.

!! Can facilitate as pronouns. pro-verbs pro-*

!! Can be clued by the use of adjectives.

!! Should begin with a verb.

#### Examples

 * A category of "Human" may have a description of "Can have wide variations in stature".
 * A category of "Triangle" may have a description of "Has Inner Angles that Sum to 180 degrees"

#### Representation

Each description node sits on a horizontal edge which is connected to a vertical bus that bends from the top of the collection at a perceptibly significant angle toward the source node.

When nested, the rules of the bended edge are consistent.

### Intro

Intros are optional elements that bridge a parent node to its children.  Intros are a preparation in going from the source to the destination. They are not a label because labels are (causitive WRONG: has three parts) while Intros are declarative.

They can also be complete sentences and act as an "Orientation" to the reader which bridges from assumed common knowledge such as a previous topic in an educational text or help structure a framework for thinking about a topic.

#### Examples

 * A category of "Triangle" may have an intro of "Is a shape with Three Sides".
 * A category of "Human" may have an "Orientation" of "In the previous chapter, we covered what it means to be living.  Now, we’ll cover an example of a living organism– Man."
 * A category of "Abraham Lincoln" may have an intro of "Was first Republican President".

#### Representation

Intros exist in a space between two nodes. Each Intro node sits on a horizontal edge which is connected to a vertical bus which extends directly from the source node. The edges that lead to Intros ought to omit destination arrows as the direction is intended to be between the two nodes that the Intro are connected to.

If there is a single Intro node, the preceding format may be omitted and instead the intro can exist below the parent node, perhaps with a more diminutive but still notable style.


### Aside

Asides is ostensibly non-critical information with regard to the flow of a document. They are intended to provide a more explicit or thorough understanding when a word or fragment may be unknown to a reader and interrupt the flow of the document.

They are orthogonal graphs or nodes of information that can facilitate but are not limited to factual blurbs ??, edge-case exceptions, and definitions.
They can also be similar to "Orientation" style Intros that reference information out of the scope of the current document.

#### Examples

 * A category of "Human" may have a set of descriptions which briefly enumerate types of organelles, which has an aside that references the entire enumeration stating "These are covered in a separate section".
 * A category of "Triangle" may have a description of "the sides of right-triangles can be computed with the Pythagorean theorem" which has a pictorial aside containing a right-triangle illustrating the computation of the Pythagorean theorem.

#### Representation

Asides may be visually distant from their parent nodes with an edge that directly connects the source node to the aside node. Generally speaking, asides should have their own visibility rules.

### Path

Paths are generally dependency graphs. Although vertical positioning of nodes implicitly defines the order of traversal, paths are more intended for highly dependent and correlated data or events.  

#### Examples

 * A category of "Human" may have a path that says "Since the cells of eukaryotes has a nucleus" (node 1), "and man is a eukaryote" (node 2), "then the cells of man has a nucleus" (node 3).
 * A category of "Triangle" may have a path that shows a proof that two triangles are congruent.

#### Representation

Each node of a path may be represented downward and outward from its parent at a consistent angle.

### Procedure

Procedures are abstractly functionally identical to paths.  The difference is subtle notion that they are instructional blocks meant for the reader to follow. They have ordinals and may have bifrucations but it is best avoided.

#### Examples

 * A category of "Human" may have a procedure outlining the steps of cellular division.
 * A category of "Triangle" may have a procedure describing the steps to compute an unknown angle given two known angles.

#### Representation

Visually similar to a vertical set of descriptions, they are augmented by being prefaced with an a strong ordinal demarcator. Their representation is subject to change based on the amount of content contained within them.

# Edges

Edges are implicated by the nodes they connect and predominantly by their destination.  For instance, a categorical node connecting to a description node is drawn in a distinct way that is determined by the fact that the destination is a description.

The thickness of an edge is inversely proportional to its depth level within a document.

Given that, edges have labels and distinct types. 

!! Collapsing

## Labels

Edges can have textual labels which may operate as a more explicit declaration of the correlation between two nodes. Labels are not nodes. They represent the function to get from the source node to the destination. In this way they are similar to a Procedure with solely two nodes.

Often they facilitate the bridging of categories.

!! Linguistically, they are orthogonal to prepositional phrases.

### Examples

 * A source node of "Human" and a destination node of "Two Legs" may have a label of "has".
 * A source node of "Triangle" and a set of destination nodes: "Equilateral", "Isosceles", and "Scalene" may have a label of "has 3 types".

### Representation

Labels sit generally at the midpoint of an edge above and on the right hand side however appropriate.

## Edge Types

### Standard Type

A directed connection between two nodes, called the source and destination where the destination is an elaboration (or expansion) of the source. One source may have multiple destinations in the standard type.  However, in this instance they are usually accompanied by labels for explatory?? purposes.

#### Examples

 * A source node of "Human" may have an edge directed to a destination node of "Two Legs".
 * A source node of "Triangle" may have an edge directed to a destination nodes of "Equilateral".
 
#### Representation

A standard edge is always directional from a Source node to a Destination node with an arrow at the destination node's point of termination (except when noted otherwise). The source terminator may have an interface which permits one to manipulate the visual style (such as visibility) of the destination.  Additionally, the source "marker" that is to say, the indicator of the context that is the source can vary in representation.  The current variations include:

  * drawing a closed loop around the word or fragment intended to be the source within a description.
  * a square bracket ( ] ) whose height encompasses the source within a description. *Note: A reverse direction bracket ( [ ) may be appropriate for lengthy content in destionation nodes.*

### Y-connector

Most edges are single source.  The exception is the multi-source connections, called a "Y-connector".  A Y-connector has

 * more than 1 source.
 * only 1 destination.
 
A Y-connector destination node is intended to encapsulate how the source nodes are related. It can be used in cases where there is no clear hierarchy between the correlated nodes and the content flow isn't from one node to the other but from both of them to something else.

The destination node can also form a new graph signifying a new topic.

#### Examples

 * A category of "Human" with two sub-categories "Brain" and "Spinal Chord" may have a Y-connector between the two sub-categories labeled "Form Central Nervous System".
 * A source node of "Triangle" and a set of destination nodes: "Equilateral", "Isosceles", and "Scalene" may have a Y-connector of "Are acute unless the isosceles has a right angle" between "Equilateral" and "Isosceles".
 * A category of "Ear Drum" may Y-connect the categories "External Ear" and "Middle Ear".

#### Representation

The graphical depiction of the Y-connector for a set of source nodes to a destination node consists of edges from the source to the single destination and
the placement of the destination horizontally centered amongst the sources and often positioned vertically below for clarity.

Furthermore, Y-connectors typically have two source nodes often arranged as close as the layout rules permit.  Refer to groups for larger, more encompassing collections.
 

# Grouping

The purpose of grouping is to represent a higher order meaning to a collection of Nodes and Edges.  By default groups are hierarchical and inheritable.  A Y-connected node inherits all parent group classifiers as a default, overridable instance. Groupings are Comitative.

Groupings can cover nodes that are discontinuous. For instance, a group could include only the left-most and right-most sub-graphs on a document and not those in between them.

There are a distinct types of grouping.

## Importance

The importance of an edge represents the significance of either relationships that the connecting nodes have or the significance of the destination node. By that, preferentially speaking, it is not meant to represent the magnitude of the topic in as much as the significance of the connection.

### Examples

 * A category of "Human" may have an important grouping which includes the description of "The functional unit of the kidney is called the nephron".
 * A category of "Triangle" may have an important grouping which includes the description of "Has Inner Angles that Sum to 180 degrees".
 
### Representation

Things of high importance may be decorated with special notation (e.g., stars, exclamation points, pointing hand, flags) or thicker edges.

## Correlation

This is the most common use of groupings and can help provide a perspective and context within a Document.  Because graphs have depths which more or less correspond to different levels of detail; grouping details together helps keep context without requiring one to visually interrupt a reading and instead stay focussed on the current level of detail.

!! Segment content based on learning style, difficulty, timing, lesson plans etc.

### Examples

 * A category of "Human" or "Triangle" may have a correlation grouping of its subcategories.
 
## Pattern

Pretend there is a set of properties `P = [p1, p2]`, a set of nodes `N = [n1, n2, n3]` and a property set that has yet to be visually displayed:

	n1 has p1 and p2
	n2 has p2
	n3 has p1

In this instance, there can be a group `g1` corresponding to `p1` which would only include `[n1, n3]` and a group `g2`, corresponding to `p2` which would only include `[n1, n2]`.


!! This higher order meaning may correspond to a section of another document or media source. 

!! Oftentimes groupings correspond to regions of an instance of media.

### Examples

 * A category of "Man" may have a pattern group reserved for everything concerned with vision (e.g., "Eyes").
 * A category of "Triangle" may have a pattern group for all the different types of triangles.
 * Additionally, for "Triangle" we could have sub-groups of "Degree" or "Length of side".

### Representation

Things of the same group may share the same background, foreground color, and or border decoration.  They may be able to be collapsed or expanded holistically or viewed in isolation.

# Complete Document

TODO

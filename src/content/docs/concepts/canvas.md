---
title: Canvas
description: Spatial visualization of your knowledge graph using force-directed simulation.
---

The Canvas is a spatial visualization where atoms are positioned using a d3-force simulation. It gives you a bird's-eye view of your entire knowledge base.

## Force Simulation

Atoms are positioned using several forces:

- **Link force** — Atoms sharing tags are linked together
- **Similarity force** — A custom force that pulls semantically-related atoms closer together
- **Charge force** — Repulsion prevents atoms from overlapping
- **Center force** — Keeps the graph centered in the viewport

## Persistent Layout

Atom positions are saved to the database, so the layout is stable across sessions. When you reopen the canvas, everything is where you left it.

## Interaction

- **Zoom and pan** — Navigate the graph with mouse/trackpad
- **Click** — Select an atom to view its content
- **Drag** — Reposition atoms manually
- **Filter** — Scope the canvas to specific tags

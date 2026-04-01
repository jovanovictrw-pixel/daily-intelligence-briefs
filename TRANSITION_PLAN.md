# Section Transition Implementation Plan

This plan outlines the steps to add a luxurious, amber-glowing transition element between the Hero/Header section and **Section 01 (The Problem)**.

## 1. Plan Structure
My goal is to create a seamless "horizon line" visual bridge between the upper hero area (including the logo bar) and the new Problem section.

### Targeted Component Location:
- **Project Structure**: Based on `src/pages/Index.tsx`:
  1. `Navbar`
  2. `Hero`
  3. `LogosBar`
  4. `ProblemSection` (Section 01)
- **Insertion**: The divider will be placed **between `LogosBar` and `ProblemSection`** to bridge the transition.

## 2. Technical Implementation details

### Component: `TransitionDivider.tsx`
A new functional component will be implemented at `src/components/vesper/TransitionDivider.tsx`.

**Styling Specifications (as per User Request):**
- **Container**: `height: 120px; position: relative; overflow: hidden; z-index: 2;`
- **Main Gradient**: `linear-gradient(to bottom, #0a0a0a 0%, transparent 50%, #0a0a0a 100%)`
- **Radial Bloom (`::before` psuedo-element)**: 
  - `radial-gradient(ellipse 50% 100% at 50% 50%, rgba(180, 140, 60, 0.18) 0%, transparent 70%)`
  - Fully inset and pinned to `z-index: 1`.
- **Horizon Line**:
  - `height: 1px`, `top: 50%`, `width: 100%`.
  - `background: linear-gradient(to right, transparent 0%, rgba(180,140,60,0.4) 20%, rgba(180,140,60,0.4) 80%, transparent 100%)`.

## 3. Implementation Workflow
1.  **Draft Component**: Create `src/components/vesper/TransitionDivider.tsx`.
2.  **Integrate**: Modify `src/pages/Index.tsx` to import and insert `<TransitionDivider />`.
3.  **Verification**: Confirm the gradient transition feels smooth and centered between the dark sections.

---
**Approval Request**: Does placing the divider *after* the `LogosBar` align with your vision of the "Hero/Header" flow? (Logos generally sit at the bottom of the hero area).

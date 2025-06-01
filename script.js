import mermaid from 'mermaid';

// Initialize Mermaid (can be done once, e.g., on page load)
mermaid.initialize({
  startOnLoad: false, // We'll render manually for more control
  theme: 'base', // Or 'dark', 'neutral', 'forest'. You'll customize this further.
  // You can set base theme variables here for fonts, colors, etc.
  // e.g., themeVariables: {
  //   primaryColor: '#2D3748', // A dark color
  //   nodeBorder: '#4A5568',
  //   lineColor: '#718096'
  // }
});

async function renderMermaidDiagram(elementId, graphDefinition) {
  const { svg } = await mermaid.render(elementId + '-svg', graphDefinition);
  const element = document.getElementById(elementId);
  if (element) {
    element.innerHTML = svg;
    // Now you can add custom event listeners
    addInteractions(elementId);
    function addInteractions(chartElementId) {
  const chartContainer = document.getElementById(chartElementId);
  if (!chartContainer) return;

  const nodes = chartContainer.querySelectorAll('.node'); // Or more specific selectors

  nodes.forEach(node => {
    node.addEventListener('click', (event) => {
      const nodeId = event.currentTarget.id; // Or get data from attributes
      console.log('Node clicked:', nodeId);
      // Example: Display info in a separate div
      const infoPanel = document.getElementById('infoPanel');
      if (infoPanel) {
        infoPanel.innerHTML = `<h3>Details for ${nodeId}</h3><p>More information about this component...</p>`;
        infoPanel.style.display = 'block';
      }
    });

    // Add hover effects if desired
    node.addEventListener('mouseenter', () => {
      node.style.transform = 'scale(1.05)'; // Simple hover effect
    });
    node.addEventListener('mouseleave', () => {
      node.style.transform = 'scale(1)';
    });
  });
}
  }
}

// Example usage:
const projectArchitecture = `
graph TD
    A[NEPO Mini-Satellite] --> B(Quantum Network Interface);
    B --> C{Shared Distributed Key};
    C --> D[Quantum Phone];
    A -.-> E[Near Earth Proximity Orbit];
    F[User Data] <--> D;

    %% Styling (example - more robustly done with CSS overrides)
    %% classDef default fill:#222,stroke:#fff,stroke-width:2px,color:#fff;
    %% classDef quantumNode fill:#5A2E8A,stroke:#C4B5FD,stroke-width:2px,color:#E0E7FF;
    %% class A,B,C,D,E,F quantumNode;
`;

// Call this after the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  renderMermaidDiagram('mermaidChart', projectArchitecture);
});


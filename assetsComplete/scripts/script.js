
        // Set current year in footer
        document.getElementById('currentYear').textContent = new Date().getFullYear();

        // Mermaid.js diagram definition
        const nepoArchitectureDiagram = `
        graph TD
            subgraph "NEPO Quantum System"
                direction LR
                A["🛰️ NEPO Mini-Satellite"]:::mainNode --> B("Quantum Network Interface"):::mainNode;
                B --> C{"Shared Distributed QKD"};
                C --> D["📱 Quantum Phone"]:::mainNode;
                A -.-> E["🌍 Near Earth Proximity Orbit"]:::orbitStyle;
                F["👤 User Data"]:::dataNode <--> D;
            end

            subgraph "Core Technologies"
                direction LR
                QNI["Quantum Network Infrastructure"]:::techNode
                SDK["Distributed Quantum Key Management"]:::techNode
                QCOMM["Quantum Communication Protocols"]:::techNode
            end

            B --> QNI;
            C --> SDK;
            D --> QCOMM;

            %% --- Node Styling ---
            classDef mainNode fill:#6A1B9A,stroke:#C4B5FD,stroke-width:2px,color:#EDE9FE,font-weight:bold,rx:8,ry:8;
            classDef techNode fill:#312E81,stroke:#A5B4FC,stroke-width:1.5px,color:#E0E7FF,rx:6,ry:6;
            classDef dataNode fill:#4A0E6A,stroke:#D8B4FE,stroke-width:2px,color:#F3E8FF,rx:8,ry:8;
            classDef orbitStyle fill:#2E1055,stroke:#7E22CE,stroke-width:1px,color:#D1D5DB,stroke-dasharray:5 5,rx:4,ry:4;

            %% --- Interactivity Hooks (Mermaid specific for click handling) ---
            %% These are the primary way Mermaid handles clicks.
            %% If these don't work, the manual event listeners below will be the fallback.
            click A call showInfo('A')
            click B call showInfo('B')
            click C call showInfo('C')
            click D call showInfo('D')
            click E call showInfo('E')
            click F call showInfo('F')
            click QNI call showInfo('QNI')
            click SDK call showInfo('SDK')
            click QCOMM call showInfo('QCOMM')
        `;

        // Information for each node
        const nodeInfo = {
            'A': { title: 'NEPO Mini-Satellite', text: 'The core satellite unit responsible for relaying quantum signals and maintaining orbit. Equipped with advanced sensors and communication arrays for robust performance in the harsh space environment.', imageUrl: 'https://placehold.co/400x250/6A1B9A/FFFFFF?text=Satellite+Concept' },
            'B': { title: 'Quantum Network Interface (QNI)', text: 'A sophisticated hardware and software module enabling the satellite to connect to the quantum network. It processes quantum states, manages entanglement distribution, and ensures seamless integration with terrestrial quantum systems.', imageUrl: 'https://placehold.co/400x250/5A2E8A/FFFFFF?text=QNI+Module' },
            'C': { title: 'Shared Distributed QKD', text: 'Quantum Key Distribution (QKD) is the heart of NEPO\'s security. This system generates and shares secret cryptographic keys between authenticated parties with security guaranteed by the laws of quantum physics, making eavesdropping detectable.', imageUrl: 'https://placehold.co/400x250/4A0E6A/FFFFFF?text=QKD+Process+Flow' },
            'D': { title: 'Quantum Phone', text: 'A revolutionary end-user device designed for voice and data communication secured by quantum keys. It offers unparalleled privacy and protection against interception, ensuring truly confidential conversations.', imageUrl: 'https://placehold.co/400x250/3A0A4A/FFFFFF?text=Quantum+Phone+Interface' },
            'E': { title: 'Near Earth Proximity Orbit', text: 'The specific orbital path carefully chosen for the NEPO satellite constellation. This orbit optimizes for global coverage, minimizes communication latency, and ensures frequent contact with ground stations.', imageUrl: 'https://placehold.co/400x250/2A0A3A/FFFFFF?text=Orbital+Trajectory' },
            'F': { title: 'User Data', text: 'Represents the sensitive information – be it voice calls, text messages, or critical files – that is being protected by the NEPO quantum network. The integrity and confidentiality of this data are paramount.', imageUrl: 'https://placehold.co/400x250/1A0A2A/FFFFFF?text=Secure+User+Data' },
            'QNI': { title: 'Quantum Network Infrastructure', text: 'The comprehensive backbone of the quantum communication system. This includes specialized ground stations, quantum-repeaters, secure fiber optic links, and the satellite relays themselves, all working in concert.', imageUrl: 'https://placehold.co/400x250/312E81/FFFFFF?text=Global+Network+Infra' },
            'SDK': { title: 'Distributed Quantum Key Management', text: 'A robust system for managing the entire lifecycle of quantum keys across the distributed network. It handles key generation, storage, rotation, and revocation, ensuring continuous availability and security.', imageUrl: 'https://placehold.co/400x250/211E71/FFFFFF?text=Key+Management+System' },
            'QCOMM': { title: 'Quantum Communication Protocols', text: 'The sophisticated set of rules, standards, and procedures that govern the transmission, reception, and processing of quantum information. These protocols ensure reliable and secure communication across all network layers.', imageUrl: 'https://placehold.co/400x250/110E61/FFFFFF?text=Communication+Protocols' }
        };

        // Function to display information in the panel
        // This function is called by Mermaid's click events OR manual event listeners
        window.showInfo = function(nodeId) {
            console.log('[Quamtum.one] showInfo triggered for nodeId:', nodeId); 

            const infoPanel = document.getElementById('infoPanel');
            const infoTitle = document.getElementById('infoTitle');
            const infoText = document.getElementById('infoText');
            const infoImage = document.getElementById('infoImage');

            if (!infoPanel || !infoTitle || !infoText || !infoImage) {
                console.error('[Quamtum.one] One or more info panel elements are missing from the DOM. Check IDs: infoPanel, infoTitle, infoText, infoImage.');
                showToast('Error: UI elements for details are missing.', 'error');
                return; 
            }
            console.log('[Quamtum.one] Info panel DOM elements successfully found.');

            const details = nodeInfo[nodeId];

            if (details) {
                console.log('[Quamtum.one] Details found for node:', nodeId, details);
                infoTitle.textContent = details.title;
                infoText.innerHTML = details.text; 

                if (details.imageUrl && details.imageUrl.trim() !== '') {
                    infoImage.src = details.imageUrl;
                    infoImage.alt = details.title + " image";
                    infoImage.classList.remove('hidden');
                    console.log('[Quamtum.one] Image set for node:', nodeId);
                } else {
                    infoImage.classList.add('hidden');
                    infoImage.src = ""; 
                    console.log('[Quamtum.one] No image for node or empty imageUrl:', nodeId);
                }
            } else {
                console.warn('[Quamtum.one] No details found in nodeInfo for ID:', nodeId);
                infoTitle.textContent = 'Information'; 
                infoText.textContent = 'Details for the selected component are currently unavailable.'; 
                infoImage.classList.add('hidden'); 
                infoImage.src = "";
            }

            infoPanel.classList.remove('opacity-0', 'scale-95');
            infoPanel.classList.add('opacity-100', 'scale-100');
            console.log('[Quamtum.one] Info panel visibility updated. Classes:', infoPanel.className);

            if (window.innerWidth < 1024) { 
                infoPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
                console.log('[Quamtum.one] Scrolled to info panel on small screen.');
            }
        };

        // Initialize Mermaid.js and render the diagram
        async function initializeAndRenderMermaid() {
            try {
                mermaid.initialize({
                    startOnLoad: false,
                    theme: 'base', 
                    themeVariables: { 
                        primaryColor: '#1A0A2A', 
                        primaryTextColor: '#E0E7FF',
                        lineColor: '#7C3AED', 
                        fontSize: '15px',
                        fontFamily: 'Inter, sans-serif',
                        nodeBorder: '#A78BFA',
                    },
                    securityLevel: 'loose', // IMPORTANT for `click call` to work with global functions
                    flowchart: {
                        htmlLabels: true, 
                        useMaxWidth: false, 
                    }
                });
                const diagramElement = document.getElementById('mermaidDiagram');
                const renderId = 'graphDiv_' + Date.now(); 
                const { svg } = await mermaid.render(renderId, nepoArchitectureDiagram);
                diagramElement.innerHTML = svg;
                console.log('[Quamtum.one] Mermaid diagram rendered.');

                // --- Manual Event Listener Attachment ---
                const svgGenerated = diagramElement.querySelector('svg');
                if (svgGenerated) {
                    console.log('[Quamtum.one] SVG element found. Attempting to add manual click listeners.');
                    // Mermaid adds the 'clickable' class to nodes that have a `click` directive.
                    // The `data-id` attribute on these elements should contain our original node ID.
                    const clickableSVGElements = svgGenerated.querySelectorAll('.clickable'); 
                    
                    console.log(`[Quamtum.one] Found ${clickableSVGElements.length} elements with class 'clickable' (Mermaid's hook).`);

                    clickableSVGElements.forEach(nodeElement => {
                        // **FIXED HERE: Use dataset.id to get the original node ID**
                        const nodeId = nodeElement.dataset.id; 
                        
                        if (nodeId && nodeInfo[nodeId]) {
                            console.log(`[Quamtum.one] Attaching manual click listener to node with data-id: ${nodeId}`);
                            nodeElement.addEventListener('click', (event) => {
                                console.log(`[Quamtum.one] Manual click listener triggered for node data-id: ${nodeId}. Event target:`, event.target);
                                window.showInfo(nodeId);
                            });
                             if (!nodeElement.classList.contains('clickable-node')) {
                                nodeElement.classList.add('clickable-node');
                            }
                        } else if (nodeElement.id) { // Log original ID if data-id didn't match
                            console.warn(`[Quamtum.one] SVG element with generated ID '${nodeElement.id}' (data-id: '${nodeId}') is clickable, but its data-id not found in nodeInfo.`);
                        } else if (nodeId) {
                             console.warn(`[Quamtum.one] SVG element with data-id '${nodeId}' is clickable, but not found in nodeInfo (and no generated ID).`);
                        }
                    });
                } else {
                    console.error('[Quamtum.one] SVG element not found within #mermaidDiagram after rendering.');
                }
                // --- End of Manual Event Listener Attachment ---

                showToast('Diagram loaded successfully!', 'success');

            } catch (error) {
                console.error("Mermaid rendering error:", error);
                document.getElementById('mermaidDiagram').innerHTML = `<p class="text-red-400">Error rendering diagram: ${error.message}. Please check console.</p>`;
                showToast('Error loading diagram.', 'error');
            }
        }

        // Toast notification function
        function showToast(message, type = 'success') {
            const toast = document.getElementById('toastNotification');
            if (!toast) { 
                console.warn("Toast notification element not found.");
                return;
            }
            toast.textContent = message;
            toast.className = 'toast'; 
            if (type === 'success') {
                toast.classList.add('toast-success');
            } else {
                toast.classList.add('toast-error');
            }
            toast.style.visibility = 'visible';
            toast.style.opacity = '1';

            setTimeout(() => {
                toast.style.opacity = '0';
                setTimeout(() => {
                    toast.style.visibility = 'hidden';
                }, 500);
            }, 3000);
        }

        // Modal functions (example)
        const infoModal = document.getElementById('infoModal');
        const closeModalButton = document.getElementById('closeModalButton');

        function openModal(title, text) {
            const modalTitleEl = document.getElementById('modalTitle');
            const modalTextEl = document.getElementById('modalText');
            if(modalTitleEl && modalTextEl && infoModal){
                modalTitleEl.textContent = title;
                modalTextEl.textContent = text;
                infoModal.classList.add('active');
            }
        }

        function closeModal() {
            if(infoModal){
                infoModal.classList.remove('active');
            }
        }

        if(closeModalButton) {
            closeModalButton.addEventListener('click', closeModal);
        }
        
        if(infoModal){
            infoModal.addEventListener('click', (event) => {
                if (event.target === infoModal) {
                    closeModal();
                }
            });
        }

        // Call initialization when DOM is ready
        document.addEventListener('DOMContentLoaded', () => {
            initializeAndRenderMermaid();
        });



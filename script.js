const API_KEY = "TU_API_KEY";

const SHEET_ID = "TU_SHEET_ID";

const RANGE = "Table 1!A:T";

async function consultarDocumento() {

    const documento = document
        .getElementById("documento")
        .value
        .trim();

    const password = document
        .getElementById("password")
        .value;

    const resultado =
        document.getElementById("resultado");

    resultado.innerHTML = "";

    if(password !== "1234") {

        resultado.innerHTML = `
        <div class="result-card">
            Password incorrecto
        </div>
        `;

        return;
    }

    const url =
    `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;

    try {

        const response =
            await fetch(url);

        const data =
            await response.json();

        const rows =
            data.values;

        let encontrado = false;

        for(let i = 5; i < rows.length; i++) {

            const fila = rows[i];

            const documentoHoja =
                fila[6] || "";

            if(documentoHoja == documento) {

                encontrado = true;

                resultado.innerHTML = `

                <div class="result-card">

                    <h2>Resultado</h2>

                    <p>
                    <strong>Documento:</strong>
                    ${fila[6]}
                    </p>

                    <p>
                    <strong>Estado OTD:</strong>
                    ${fila[14] || "Sin información"}
                    </p>

                </div>

                `;

                break;
            }
        }

        if(!encontrado){

            resultado.innerHTML = `

            <div class="result-card">

                Documento no encontrado

            </div>

            `;
        }

    }
    catch(error){

        resultado.innerHTML = `

        <div class="result-card">

            Error consultando Google Sheets

        </div>

        `;

        console.error(error);
    }
}

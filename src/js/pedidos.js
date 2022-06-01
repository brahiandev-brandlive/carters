const pedidos_get = async () => {
    const ref = document.getElementById("client-apellido").value;

    const headers = {
        "Content-Type": "application/json",
        "X-VTEX-API-AppKey": "vtexappkey-tuissarg-RSRUNA",
        "X-VTEX-API-AppToken": "DRAHJNOACVXXTAZSSFZZYKVDNVBXGTWTMYITWADZGHWFCYMJKYJBRCSSWXTNLRTIZELUSFVSCATQOPBPISMHKUBJGPXZGPNPNNGXNSRFCRYQJBEGVEFTELYECBNCHWLN" 
    }
    const URL = `/api/oms/pvt/orders/${ ref }`
    const response = await fetch(URL, { method: 'GET', headers });
    const data = await response.json();

    if (response.status === 200) {
        const { sellers: companies, packageAttachment, orderId, clientProfileData: { firstName, lastName }, shippingData: { address: { street, city } } } = data;
        const [ company ] = companies;
        const { packages } = packageAttachment
        let transporter = 'Sin Transportadora'
        let trackingNumber = 'Sin Tracking'
        let trackingUrl = 'Sin Tracking URL'

        if (packages.length > 0) {
            const [ package ] = packages;
            transporter = package.courier
            trackingNumber = package.trackingNumber
            trackingUrl = package.trackingUrl
        }

        document.getElementById("numero_pedido").innerHTML = `<div>
            <div class='datos_tabla'>
                <h3>Datos del Remitente</h3>
                <li>
                    <strong>Nombre: </strong> ${ company.name }
                </li>
                <li><strong>Transportadora: </strong> ${ transporter } </li>
                <li><strong>Numero de Guía: </strong> ${ trackingNumber } </li>
                <li><strong>Url de Rastreo: </strong><a href='${ trackingUrl }'>  ${ trackingUrl } </a></li>
            </div>
            <div class='datos_tabla'>
                <h3>Datos del Destinatario</h3>
                <li><strong>Numero de pedido: </strong> ${ orderId } </li>
                <li><strong>Nombre: </strong>${ firstName } ${ lastName }</li>
                <li><strong>Dirrección: </strong>${ street }</li>
                <li><strong>Ciudad: </strong> ${ city } </li>
            </div>
        </div>`
        document.querySelector(".pedidos_button-submit").remove();
    } else {
        document.getElementById("numero_pedido").innerHTML = "<div class='sin_datos'>No Hay Datos Disponibles</div>";
    }

    // //obtener solo datos de paginas activas
    // const URL_search = "/api/oms/pvt/orders/" + ref + "";
    // fetch(URL_search, { method: "GET", headers: { "Content-Type": "application/json", "X-VTEX-API-AppKey": "vtexappkey-tuissarg-RSRUNA", "X-VTEX-API-AppToken": "DRAHJNOACVXXTAZSSFZZYKVDNVBXGTWTMYITWADZGHWFCYMJKYJBRCSSWXTNLRTIZELUSFVSCATQOPBPISMHKUBJGPXZGPNPNNGXNSRFCRYQJBEGVEFTELYECBNCHWLN" } })
    //     .then(function (response) {
    //         return response.json()
    //     })
    //     .then(function (data2) {
    //         if (data2.orderId) {
    //             const empresa = data2.sellers[0].name;
    //             const transp = data2.packageAttachment.packages[0].courier;
    //             const numtrank = data2.packageAttachment.packages[0].trackingNumber;
    //             const url = data2.packageAttachment.packages[0].trackingUrl;
    //             const order = data2.orderId;
    //             const name = data2.clientProfileData.firstName;
    //             const apellido = data2.clientProfileData.lastName;
    //             const calle = data2.shippingData.address.street;
    //             const ciudad = data2.shippingData.address.city;

    //             //obtener todo el documento
    //             document.getElementById("numero_pedido").innerHTML = "<div><div class='datos_tabla'><h3>Datos del Remitente</h3><li><strong>Nombre: </strong>" + empresa + "</li><li><strong>Transportadora: </strong>" + transp + "</li><li><strong>Numero de Guía: </strong>" + numtrank + "</li><li><strong>Url de Rastreo: </strong><a href='" + url + "'>" + url + "</a></li></div><div class='datos_tabla'><h3>Datos del Destinatario</h3><li><strong>Numero de pedido: </strong>" + order + "</li><li><strong>Nombre: </strong>" + name + " " + apellido + "</li><li><strong>Dirrección: </strong>" + calle + "</li><li><strong>Ciudad: </strong>" + ciudad + "</li></div></div>";
    //             document.querySelector(".pedidos_button-submit").remove();

    //         } else {
    //             document.getElementById("numero_pedido").innerHTML = "<div class='sin_datos'>No Hay Datos Disponibles</div>";
    //         }
    //     });
}

var p = document.querySelector(".pedidos_button-submit"); // Encuentra el elemento "p" en el sitio
p.onclick = infoUsuario; // Agrega función onclick al elemento
function infoUsuario() {
    pedidos_get();
}


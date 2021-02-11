$(document).ready( () => {

    $('#btnTest').click( () => {
        console.log('launching test...');

        fetch('https://us-central1-silver-script-302408.cloudfunctions.net/getHTMLContent?url=http://example.com')
            .then(response => response.json() )
            .then(data => { console.log(data) } )
            .catch( error => { console.log(error) } );
    });
});
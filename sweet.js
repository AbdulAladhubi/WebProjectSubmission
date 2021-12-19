
// i used these sweet alerts to add some interaction 


function sweetAlert(){
    swal({
        title: "Finish Payment",
        text: "Click Continueto Complete Your Order!",
        icon: "",
        buttons: true,
        dangerMode: false,
      })
      .then((willDelete) => {
        if (willDelete) {
          swal("Your payment have been succsesfully completed!", {
            icon: "success",
          });
        } else {
          swal("Payment canceled");
        }
      });
}

function ShowAlert2(){
  event.preventDefault();
  Swal.fire({
      title: 'Thanks for your message',
      imageUrl: '/character1Gif.gif',
      imageWidth: 400,
      imageHeight: 400,
      imageAlt: 'Custom image',
      border: '1px solid #F0E1A1',
      width: 600,
      padding: '2em',
      color: 'white',
      html: 'we try our best to get back to our clients as soon as possible',  
      background: 'linear-gradient(90deg, rgba(11,18,18,0.7570378493194152) 0%, rgba(193,27,27,0.3508753843334209) 100%), url(/abstract.jpg)',
      backdrop: `
      rgb(35,170,171)
        url("/thanks.gif")
        left top
        no-repeat
      `
    })
}

import axios from 'axios';



export default function Karma(){
	const response = '';

	axios.get('localhost:5000',
	{headers:{
	'Content-Type': 'text/html;charset=UTF-8',
	"Access-Control-Allow-Origin": "*",
	}
	})
	.then((response)=>{
		console.log(response);
		response = response;
	})
	.catch((err)=>{
		console.log(err);
	});
	return response;
}
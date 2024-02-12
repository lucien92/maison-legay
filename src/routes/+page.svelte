<script>
    
	import { supabase } from '../lib/supabaseClient';
	import { onMount } from 'svelte';
  
	let produits = ["huîtres", "palourdes", "coques"];
	let produitId;
	let quantite = 1;
	let nom = '';
	let email = '';
  
	onMount(async () => {
	  const { data, error } = await supabase.from('produits').select('*');
	  if (error) {
		console.error('Erreur lors de la récupération des produits', error);
	  } else {
		produits = data;
	  }
	});
  
	async function passerCommande() {
	  if (!produitId) {
		alert('Veuillez sélectionner un produit.');
		return;
	  }
  
	  const { data, error } = await supabase
		.from('commandes')
		.insert([
		  { 
			produit_id: produitId, 
			quantite: quantite, 
			nom: nom, 
			email: email, 
			date_commande: new Date().toISOString() 
		  }
		]);
  
	  if (error) {
		console.error('Erreur lors de la soumission de la commande', error);
		alert("Erreur lors de la soumission de la commande : " + error.message);
	  } else {
		alert("Commande passée avec succès !");
		produitId = null;
		quantite = 1;
		nom = '';
		email = '';
	  }
	}
  
  </script>
  
  <style>
	form {
	  max-width: 500px;
	  margin: auto;
	  padding: 20px;
	  background: #f9f9f9;
	  border-radius: 8px;
	  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	}
	label {
	  display: block;
	  margin-top: 20px;
	}
	input, select {
	  width: 100%;
	  padding: 10px;
	  margin-top: 5px;
	  border: 1px solid #ddd;
	  border-radius: 4px;
	  box-sizing: border-box;
	}
	button {
	  display: block;
	  width: 100%;
	  padding: 10px;
	  margin-top: 30px;
	  background-color: #5cb85c;
	  color: white;
	  border: none;
	  border-radius: 4px;
	  cursor: pointer;
	  font-size: 16px;
	  transition: background-color 0.3s ease;
	}
	button:hover {
	  background-color: #4cae4c;
	}
	button:disabled {
	  background-color: #ccc;
	  cursor: not-allowed;
	}
  </style>
  
  <form on:submit|preventDefault={passerCommande}>
	<label for="produit">Type de produit :</label>
	<select id="produit" bind:value={produitId}>
	  <option value="">Sélectionnez un produit</option>
	  {#each produits as produit}
		<option value={produit.id}>{produit.nom}</option>
	  {/each}
	</select>
  
	<label for="quantite">Quantité :</label>
	<input type="number" id="quantite" min="1" bind:value={quantite} required>
  
	<label for="nom">Votre nom :</label>
	<input type="text" id="nom" bind:value={nom} required>
  
	<label for="email">Adresse mail :</label>
	<input type="email" id="email" bind:value={email} required>
  
	<button type="submit" disabled={!produitId || !nom || !email}>Passer la commande</button>

  </form>
  
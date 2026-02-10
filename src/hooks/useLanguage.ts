import { useState, useEffect } from 'react';

interface Translations {
  [key: string]: string;
}

const translations = {
  en: {
    // Header
    company_name: "Welco",
    get_early_access: "Get Early Access",
    
    // Hero Section
    hero_title: "Turn Every Guest Into a Raving Fan",
    hero_subtitle: "The AI assistant that makes property owners look like hospitality legends. 24/7 WhatsApp support, local recommendations, and revenue sharing—all while you sleep.",
    join_waitlist: "Join the Waitlist",
    
    // WhatsApp conversation
    whatsapp_problem: "Hello! The coffee machine isn't working properly",
    whatsapp_solution: "I can help with that! First, check if the water tank is properly seated...",
    whatsapp_followup: "That worked! Any good restaurants nearby?",
    whatsapp_recommendation: "I recommend Casa Romaneasca (5 min walk) - traditional cuisine, 4.8★ rating",
    
    // Problem Section
    stop_losing_sleep: "Stop Losing Sleep Over Guest Messages",
    hours_weekly: "5-7 Hours Weekly",
    hours_description: "Answering the same appliance questions repeatedly",
    missed_revenue: "Missed Revenue",
    missed_revenue_description: "No time to provide premium local recommendations",
    rating_anxiety: "Rating Anxiety",
    rating_anxiety_description: "Response delays hurt your booking platform ratings",
    
    // Solution Section
    meet_expert: "Meet Your 24/7 Hospitality Expert",
    instant_support: "Instant Appliance Support",
    instant_support_description: "AI knows every appliance manual. Guests get step-by-step help instantly.",
    instant_support_example: "\"How do I turn on the dishwasher?\" → Instant visual guide",
    local_expert: "Local Expert Recommendations",
    local_expert_description: "Curated local business partnerships. You earn 5% from every recommendation.",
    local_expert_example: "Restaurant bookings → €5-15 commission per guest",
    perfect_hosting: "Perfect Hosting Image",
    perfect_hosting_description: "Guests think you're incredibly responsive. You're actually sleeping.",
    perfect_hosting_example: "\"⭐⭐⭐⭐⭐ Host responded instantly at 2 AM!\"",
    
    // Revenue Section
    technology_pays_back: "Finally, Technology That Pays You Back",
    monthly_cost: "Monthly Cost",
    potential_earnings: "Potential Earnings",
    revenue_share_description: "5% revenue share from local business partnerships. The more you recommend, the more you earn.",
    
    // Testimonials Section
    join_owners_succeeding: "Join Property Owners Already Succeeding",
    testimonial1: "\"My guests love the instant help. I've earned €180 in restaurant commissions this month alone.\"",
    testimonial1_name: "Ana Muresan",
    testimonial1_location: "Vila Ana, Brasov",
    testimonial2: "\"I sleep through the night now. Welco handles everything perfectly.\"",
    testimonial2_name: "Mihai Ionescu",
    testimonial2_location: "Apartment Complex, Bucharest",
    testimonial3: "\"5-star reviews increased 40% since using Welco. Guests mention our 'exceptional service'.\"",
    testimonial3_name: "Elena Popescu",
    testimonial3_location: "Mountain Cabin, Sinaia",
    
    // Final CTA
    ready_legendary_host: "Ready to Become a Legendary Host?",
    join_waitlist_early_access: "Join the waitlist for early access.",
    enter_email: "Enter your email address",
    joining: "Joining...",
    no_spam: "No spam. Updates on launch timeline only.",
    
    // Footer
    building_future: "Building the future of hospitality",
    
    // Toast messages
    invalid_email: "Invalid email",
    invalid_email_description: "Please enter a valid email address.",
    already_registered: "Already registered",
    already_registered_description: "This email is already on our waitlist.",
    welcome_to_welco: "Welcome to Welco!",
    welcome_description: "You've been added to our waitlist. We'll notify you when we launch.",
    something_wrong: "Something went wrong",
    try_again: "Please try again later."
  },
  ro: {
    // Header
    company_name: "Welco",
    get_early_access: "Obține Acces",
    
    // Hero Section
    hero_title: "Transformă Fiecare Oaspete Într-un Fan Înfocat",
    hero_subtitle: "Asistentul AI care îi face pe proprietarii de locuințe să pară legende în ospitalitate. Suport WhatsApp 24/7, recomandări locale și venituri suplimentare—totul în timp ce dormi.",
    join_waitlist: "Alătură-te Listei de Așteptare",
    
    // WhatsApp conversation
    whatsapp_problem: "Salut! Espresorul nu funcționează cum trebuie",
    whatsapp_solution: "Te pot ajuta! Întâi verifică dacă rezervorul de apă este așezat corect...",
    whatsapp_followup: "A mers! Știi restaurante bune prin zonă?",
    whatsapp_recommendation: "Îți recomand Casa Românească (5 min pe jos) - bucătărie tradițională, 4.8★",
    
    // Problem Section
    stop_losing_sleep: "Nu Mai Pierde Somnul Din Cauza Mesajelor Oaspeților",
    hours_weekly: "5-7 Ore Săptămânal",
    hours_description: "Răspunzi la aceleași întrebări despre aparate în mod repetat",
    missed_revenue: "Venituri Pierdute",
    missed_revenue_description: "Nu ai timp să oferi recomandări locale premium",
    rating_anxiety: "Anxietatea Evaluărilor",
    rating_anxiety_description: "Întârzierile în răspuns îți afectează evaluările pe platforme",
    
    // Solution Section
    meet_expert: "Întâlnește-ți Expertul în Ospitalitate 24/7",
    instant_support: "Suport Instant pentru Aparate",
    instant_support_description: "AI-ul cunoaște fiecare manual de aparate. Oaspeții primesc ajutor pas cu pas instantaneu.",
    instant_support_example: "\"Cum pornesc mașina de spălat vase?\" → Ghid vizual instant",
    local_expert: "Recomandări de Expert Local",
    local_expert_description: "Parteneriate cu afaceri locale curate. Câștigi 5% din fiecare recomandare.",
    local_expert_example: "Rezervări restaurant → €5-15 comision per oaspete",
    perfect_hosting: "Imaginea Perfectă de Gazdă",
    perfect_hosting_description: "Oaspeții cred că ești incredibil de receptiv. Tu de fapt dormi.",
    perfect_hosting_example: "\"⭐⭐⭐⭐⭐ Gazda a răspuns instantaneu la 2 dimineața!\"",
    
    // Revenue Section
    technology_pays_back: "În Sfârșit, Tehnologie Care Îți Aduce Profit",
    monthly_cost: "Cost Lunar",
    potential_earnings: "Câștiguri Potențiale",
    revenue_share_description: "5% din veniturile parteneriatelor cu afaceri locale. Cu cât recomanzi mai mult, cu atât câștigi mai mult.",
    
    // Testimonials Section
    join_owners_succeeding: "Alătură-te Proprietarilor Care Deja Au Succes",
    testimonial1: "\"Oaspeții mei adoră ajutorul instant. Am câștigat €180 din comisioane de restaurant doar luna aceasta.\"",
    testimonial1_name: "Ana Muresan",
    testimonial1_location: "Vila Ana, Brașov",
    testimonial2: "\"Acum dorm toată noaptea. Welco se ocupă de totul perfect.\"",
    testimonial2_name: "Mihai Ionescu",
    testimonial2_location: "Complex de Apartamente, București",
    testimonial3: "\"Recenziile de 5 stele au crescut cu 40% de când folosesc Welco. Oaspeții menționează 'serviciul nostru excepțional'.\"",
    testimonial3_name: "Elena Popescu",
    testimonial3_location: "Cabană de Munte, Sinaia",
    
    // Final CTA
    ready_legendary_host: "Gata să Devii o Gazdă Legendară?",
    join_waitlist_early_access: "Alătură-te listei de așteptare pentru acces cu prioritate.",
    enter_email: "Introdu adresa ta de email",
    joining: "Se înscrie...",
    no_spam: "Fără spam. Doar actualizări despre lansare.",
    
    // Footer
    building_future: "Construim viitorul ospitalității",
    
    // Toast messages
    invalid_email: "Email invalid",
    invalid_email_description: "Te rog să introduci o adresă de email validă.",
    already_registered: "Deja înregistrat",
    already_registered_description: "Acest email este deja pe lista noastră de așteptare.",
    welcome_to_welco: "Bun venit la Welco!",
    welcome_description: "Ai fost adăugat pe lista noastră de așteptare. Te vom anunța când lansăm.",
    something_wrong: "Ceva nu a mers bine",
    try_again: "Te rog să încerci din nou mai târziu."
  }
};

export const useLanguage = () => {
  const [language, setLanguage] = useState<'en' | 'ro'>('en');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const detectLanguage = async () => {
      try {
        // Try to get user's country from IP
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        if (data.country_code === 'RO') {
          setLanguage('ro');
        } else {
          setLanguage('en');
        }
      } catch (error) {
        console.log('Could not detect location, defaulting to English');
        setLanguage('en');
      } finally {
        setIsLoading(false);
      }
    };

    detectLanguage();
  }, []);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return { language, t, isLoading };
};

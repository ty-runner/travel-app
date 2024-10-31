import OpenAI from "openai";
const openai = new OpenAI();

const generateItinerary = async (destination, days, preferences) => {
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: "You are a travel itinerary planner." },
            {
                role: "user",
                content: `Create a ${days}-day travel itinerary for ${destination}. The user prefers ${preferences}. Include top sights, meal recommendations, and travel tips.`,
            },
        ],
    });

    console.log(completion.choices[0].message.content);
};

generateItinerary("Paris, France", 3, "art museums, historical sites, and local cuisine at a relaxed pace");

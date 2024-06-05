const OpenAI = require("openai");
const openai = new OpenAI({
    apiKey: "",
    dangerouslyAllowBrowser: true
});

export default async function getImage(Prompt) {
    const style = localStorage.getItem("style");
    // console.log(Prompt)
    if (typeof Prompt == "string") {
        const response = await openai.images.generate({
            model: "dall-e-2",
            prompt: `A ${style} image of ${Prompt}`,
            n: 1,
            size: "512x512",
        })
        return response.data[0].url;
    }
    else {
        console.log("https://images.dog.ceo/breeds/ridgeback-rhodesian/n02087394_1722.jpg");
        return "https://images.dog.ceo/breeds/ridgeback-rhodesian/n02087394_1722.jpg";
    }
}


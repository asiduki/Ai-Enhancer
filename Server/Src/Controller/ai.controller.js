const express = require("express");
const generateContent = require("../Service/ai.service.js");

const generateText = async (req, res) => {
    const prompt = req.body.prompt;
    if(!prompt) return res.status(400).json({ message: "Prompt is required" });
    else{
        try {
        const aiResponse = await generateContent(prompt); 
        res.send(aiResponse);
        }
        catch(error){
            res.status(500).json({ message: "Internal server error" });
        }
    }
}

module.exports = { generateText };
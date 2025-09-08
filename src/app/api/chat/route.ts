/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    // Correct Gemini API URL
    const response = await fetch(
       `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${`AIzaSyDD_UAbE9XZNOnGZopfJChltm4PTMnFxp8`}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are a helpful, friendly, and concise assistant. Answer the user clearly and fully.\n\nUser: ${message}`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 200
          }
        })
      }
    );

    const data = await response.json();
    console.log("Gemini API response:", JSON.stringify(data, null, 2));
    console.error("Gemini API Error:", data.error);

    let botMessage = "No response";

    // Correct response parsing for Gemini

    if (data?.candidates?.length > 0) {
      const candidate = data.candidates[0];
      if (candidate?.content?.parts?.length > 0) {
        botMessage = candidate.content.parts
          .map((part: any) => part.text)
          .join(" ")
          .trim();
      }
    }

    // Check for errors
    if (data?.error) {
      console.error("Gemini API Error:", data.error);
      botMessage = "Sorry, I encountered an error. Please try again.";
    }

    return NextResponse.json({ botMessage });
  } catch (err) {
    console.error("Route Error:", err);
    return NextResponse.json({ 
      botMessage: "Error connecting to AI service." 
    }, { status: 500 });
  }
}
import { supabaseClient } from ".";

export async function savePngToSupabase(filename: string, svgData: string) {
    try {
        // Upload SVG to Supabase storage
        const { data, error } = await supabaseClient.storage.from('ethsydney').upload(`${filename}.png`, svgData);

        if (error) {
            console.error('Error uploading PNG to Supabase:', error.message);
        } else {
            console.log('PNG uploaded successfully');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Function to save SVG to Supabase storage
export async function saveSvgToSupabase(filename: string, svgData: string) {
    try {
        // Upload SVG to Supabase storage
        const { data, error } = await supabaseClient.storage.from('ethsydney').upload(`${filename}.svg`, svgData);

        if (error) {
            console.error('Error uploading SVG to Supabase:', error.message);
        } else {
            console.log('SVG uploaded successfully');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
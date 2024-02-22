import { supabase } from "../../supabaseClient";

const fetchData = async () => {
    try {
        let { data, error } = await supabase.from("ClientInfo").select("*");
        if (error) {
            console.log(error);
        }
        return data
    } catch (error) {
        console.log(error);
    }
}

export default fetchData;
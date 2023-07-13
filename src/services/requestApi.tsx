interface Country {
    flag: string;
    name: string;
    nativeName: string;
    population: number;
    region: string;
    subregion: string;
    capital: string;
    topLevelDomain: string;
    currencies: Array<Currency>;
    languages: Array<Language>;
    borders: string[];
    alpha3Code: string;
}

interface Currency {
    name: string;
}

interface Language {
    name: string;
}

   

async function getCountries(): Promise<Country[]> {
    const response = await fetch('/api/data.json');
    const countries: Country[] = await response.json();
    return countries;
}

export { getCountries };

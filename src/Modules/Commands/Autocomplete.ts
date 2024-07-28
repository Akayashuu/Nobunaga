import levenshtein from "levenshtein"


interface AutcompleteOptions {
    common_substring_start_index?: number;
    negative_args?: string[];
    availableOptionsKeys?: string[];
    hasToBeExact?: boolean;
    autocomplete_message?: boolean;
}

export { AutcompleteOptions }

class Autocomplete {
    
    /**
     * @description Possible choices
     * @date 26/10/2023 - 15:22:34
     *
     * @private
     * @type {string[]}
     */
    private availableOptions: string[];

    
    /**
     * @description Available options keys
     * @date 04/03/2024 - 02:54:59
     *
     * @private
     * @type {string[]}
     */
    private availableOptionsKeys: string[];
    
    /**
     * @description string input
     * @date 26/10/2023 - 15:22:40
     *
     * @private
     * @type {string}
     */
    private str_input: string;

    
    /**
     * @description Common substring start index
     * @date 18/02/2024 - 01:51:05
     *
     * @private
     * @type {number}
     */
    private common_substring_start_index: number = 1;
    /**
     * @description Negative args
     * @date 19/02/2024 - 19:01:31
     *
     * @private
     * @type {string[]}
     */
    private negative_args: string[]

    /**
     * @description Has to be exact
     * @date 08/03/2024 - 00:53:01
     *
     * @private
     * @type {boolean}
     */
    private hasToBeExact: boolean = false;

    /**
     * Creates an instance of Autocomplete.
     * @date 26/10/2023 - 15:22:57
     *
     * @constructor
     * @param {string[]} availableOptions
     * @param {string} str_input
     */
    constructor(availableOptions: string[], str_input: string, options: AutcompleteOptions = {}) {
        this.availableOptions = availableOptions;
        this.str_input = str_input.toLowerCase();
        this.common_substring_start_index = options.common_substring_start_index || 1;
        this.negative_args = options.negative_args || [];
        this.availableOptionsKeys = options.availableOptionsKeys || [];
        this.hasToBeExact = options.hasToBeExact || false;
    }


    /**
     * @description Get the autocomplete
     * @date 03/12/2023 - 20:24:18
     * @public
     * @returns {string}
     */
    public getCommandAutocomplete():string {
        for (let option of this.availableOptions) {
            if (option.toLowerCase().startsWith(this.str_input) || option.toLowerCase() === this.str_input) return option.toLowerCase();
        }
    }

    
    /**
     * @description Get the autocomplete for subcommands
     * @date 31/01/2024 - 22:35:26
     *
     * @public
     * @returns {string|false}
     */
    public getSubArgumentAutocomplete():(string|false) {
        if(this.str_input === '') return false;
        if(this.negative_args.includes(this.str_input)) return false;
        for (let option of this.availableOptions) {
            if (this.str_input.startsWith(option.toLowerCase()) || option.toLowerCase() === this.str_input) return option.toLowerCase();
        }
        if(this.hasToBeExact && !this.availableOptions.includes(this.str_input)) return false;
        let highestCommonSubstring_number = 0, key = ""; 
        for(let k of this.availableOptions) {
            for(let i = this.common_substring_start_index; i <= this.str_input.length; i++) {
                const commonSubstrings = this.findCommonSubstrings(this.str_input, k.toLowerCase(), i);
                if(commonSubstrings.length >= 1) {
                    for(let substring of commonSubstrings) {
                        if(substring.length > highestCommonSubstring_number || k.startsWith(this.str_input)) {
                            highestCommonSubstring_number = substring.length;
                            key = k.toLowerCase();
                        }
                    }
                }
            }
        }
        if(highestCommonSubstring_number > 0) return key;
        let bestMatch = { option: '', distance: Infinity };
        for (let k of this.availableOptions) {
            const currentDistance = new levenshtein(this.str_input, k.toLowerCase()).distance;
            if (currentDistance < bestMatch.distance) {
                bestMatch = { option: k.toLowerCase(), distance: currentDistance };
            }
        }
        if (this.availableOptions.includes(this.str_input)) {return this.str_input;}
        if (bestMatch.distance <= 2) {return bestMatch.option;}
        return false
    }

    /**
     * @description Get the autocomplete for subcommands
     * @date 31/01/2024 - 22:35:26
     *
     * @public
     * @returns {string|false}
     */
    public getSubArgumentAutocompleteWithKey():(string|false) {
        if(this.str_input === '') return false;
        if(this.negative_args.includes(this.str_input)) return false;
        for (let option of this.availableOptions) {
            if (this.str_input.startsWith(option.toLowerCase()) || option.toLowerCase() === this.str_input) return this.availableOptionsKeys[this.availableOptions.indexOf(option)];
        }
        let highestCommonSubstring_number = 0, key = ""; 
        for(let k of this.availableOptions) {
            for(let i = this.common_substring_start_index; i <= this.str_input.length; i++) {
                const commonSubstrings = this.findCommonSubstrings(this.str_input, k.toLowerCase(), i);
                if(commonSubstrings.length >= 1) {
                    for(let substring of commonSubstrings) {
                        if(substring.length > highestCommonSubstring_number || k.startsWith(this.str_input)) {
                            highestCommonSubstring_number = substring.length;
                            key = k;
                        }
                    }
                }
            }
        }
        if(highestCommonSubstring_number > 0) return this.availableOptionsKeys[this.availableOptions.indexOf(key)];
        let bestMatch = { option: '', distance: Infinity };
        for (let k of this.availableOptions) {
            const currentDistance = new levenshtein(this.str_input, k.toLowerCase()).distance;
            if (currentDistance < bestMatch.distance) {
                bestMatch = { option: k.toLowerCase(), distance: currentDistance };
            }
        }
        if (this.availableOptions.includes(this.str_input)) {return this.availableOptionsKeys[this.availableOptions.indexOf(this.str_input)];}
        if (bestMatch.distance <= 2) {return this.availableOptionsKeys[this.availableOptions.indexOf(bestMatch.option)];}
        return false
    }

    
    /**
     * @description Get the 
     * @date 31/01/2024 - 22:39:06
     *
     * @private
     * @param {string} str1
     * @param {string} str2
     * @param {number} maxKey
     * @returns {string[]}
     */
    private findCommonSubstrings(str1: string, str2: string, maxKey: number): string[] {
        const commonSubstrings = new Set<string>();
        const matrix: number[][] = Array(str1.length + 1).fill(null).map(() => Array(str2.length + 1).fill(0));
        let maxLength = 0;
        
        for (let i = 1; i <= str1.length; i++) {
            for (let j = 1; j <= str2.length; j++) {
                if (str1[i - 1].toLowerCase() === str2[j - 1].toLowerCase()) {
                    matrix[i][j] = matrix[i - 1][j - 1] + 1;
                    if (matrix[i][j] > maxLength) {
                        maxLength = matrix[i][j];
                        commonSubstrings.clear(); // Réinitialiser les sous-chaînes communes
                    }
                    if (matrix[i][j] === maxLength && maxLength >= maxKey) {
                        const substring = str1.substring(i - maxLength, i); // Extraire la sous-chaîne correctement
                        commonSubstrings.add(substring);
                    }
                }
            }
        }
        return Array.from(commonSubstrings);
    }    
    

    
    /**
     * @description Set the string input
     * @date 04/03/2024 - 02:35:26
     *
     * @public
     * @param {string} str_input
     */
    public setStringInput(str_input: string) {
        this.str_input = str_input;
    }

    
    /**
     * @description Set the available options keys
     * @date 04/03/2024 - 02:57:30
     *
     * @public
     * @param {string[]} availableOptionsKeys
     */
    public setAvailableOptionsKeys(availableOptionsKeys: string[]) {
        this.availableOptionsKeys = availableOptionsKeys;
    }
}

export default Autocomplete;
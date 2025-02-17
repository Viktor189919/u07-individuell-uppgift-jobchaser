"use client"
import styles from "@/components/Searchbar/Searchbar.module.css"

import { SearchbarProps } from  "@/types/searchbarTypes"

export default function Searchbar({ inputValue, searchFunc } : SearchbarProps) {

    return  (<div className={styles.searchbarContainer}>
                <p className={styles.searchHeader}>Search jobs</p>
                <input className={styles.input}
                    type="text" 
                    value={inputValue}
                    onChange={(e : React.ChangeEvent<HTMLInputElement>) => searchFunc(e)}
                    placeholder="Ex. React..."
                />
            </div>)
}
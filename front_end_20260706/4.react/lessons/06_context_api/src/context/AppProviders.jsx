import SortProvider from "./sortContext";
import { ThemeProvider } from "./ThemeContext";
import { WatchlistProvider } from "./WatchlistContext";

export default function AppProviders({ children }) {

    return (
        <ThemeProvider>
            <WatchlistProvider>
                <SortProvider>
                    {children}
                </SortProvider>
            </WatchlistProvider>
        </ThemeProvider>
    )
}
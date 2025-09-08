"use client"
import { TextField, InputAdornment, IconButton, Box } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import { styled } from "@mui/material/styles"
import { useLanguage } from "./LanguageContext"
import { useState } from "react"

const StyledTextField = styled(TextField)(({ theme }) => ({
  backgroundColor: "white",
  borderColor: "#1976d2 !important",
  borderWidth: "2px",
  borderRadius: "28px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
  transition: "all 0.3s ease",
  "& .MuiOutlinedInput-root": {
    borderRadius: "28px",
    paddingLeft: "16px",
    "&:hover fieldset": {
      borderColor: "#1976d2 !important",
      borderWidth: "1px",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#1976d2 !important",
      borderWidth: "1px",
    },
    "& fieldset": {
      borderColor: "#e0e0e0",
      borderWidth: "1px",
    },
  },
  "&:hover": {
    boxShadow: "0 6px 16px rgba(25, 118, 210, 0.15)",
  },
  "&.Mui-focused": {
    boxShadow: "0 6px 16px rgba(25, 118, 210, 0.2)",
  },
}))

const searchPlaceholders: Record<string, string> = {
  English: "Search for anything...",
  Urdu: "...تلاش کریں"
}

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const { language } = useLanguage()
  const [searchValue, setSearchValue] = useState<string>("")
  const [error, setError] = useState<string>("") 
  
  const handleSearch = (): void => {
    if (!searchValue.trim()) {
      setError("Please! Enter ask a question")
      return
    }

    if (searchValue.trim() && searchValue.length <= 200) {
      onSearch(searchValue)
      setSearchValue("")
      setError("")
    }
  }
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value.length <= 200) {
      setSearchValue(value)
      setError("") // reset error on typing
    } else {
      setError("You cannot enter more than 200 characters!")
    }
  }

  return (
    <Box sx={{ width: '100%', p: 1 }}>
      <StyledTextField
        variant="outlined"
        placeholder={searchPlaceholders[language]}
        fullWidth
        size="medium"
        value={searchValue}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        error={!!error}
        helperText={error}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton 
                edge="end"
                onClick={handleSearch}
                aria-label="search"
                sx={{
                  backgroundColor: "#00b3ff",
                  color: "white",
                  padding: "8px",
                  marginRight: "4px",
                  borderRadius: "50%",
                  "&:hover": {
                    backgroundColor: "#1565c0",
                  },
                }}
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
          sx: {
            paddingRight: "4px",
          },
        }}
      />
    </Box>
  )
}

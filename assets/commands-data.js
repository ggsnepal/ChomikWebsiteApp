// generated from the bot's live command list
window.CHOMIK_COMMANDS = [
 {
  "name": "1337",
  "description": "Translate your text to leetspeak",
  "category": "Fun",
  "params": [
   {
    "name": "query",
    "required": true,
    "description": "Text to convert"
   }
  ],
  "prefix": []
 },
 {
  "name": "accountage",
  "description": "Get a Roblox account's age and creation date (works with erased accounts)",
  "category": "Roblox",
  "params": [
   {
    "name": "query",
    "required": true,
    "description": "Roblox username or User ID"
   }
  ],
  "prefix": [
   "accountage",
   "age"
  ]
 },
 {
  "name": "attach",
  "description": "Make the bot send an attached image",
  "category": "Say",
  "params": [
   {
    "name": "image",
    "required": true,
    "description": "Attach a file/image for the bot to send"
   }
  ],
  "prefix": []
 },
 {
  "name": "australian",
  "description": "Check if a Roblox account is Australian",
  "category": "Roblox",
  "params": [
   {
    "name": "user",
    "required": true,
    "description": "Roblox username or User ID to check"
   }
  ],
  "prefix": [
   "aussie",
   "aus",
   "au"
  ]
 },
 {
  "name": "avatar",
  "description": "Get a Roblox user's current avatar",
  "category": "Roblox",
  "params": [
   {
    "name": "user",
    "required": true,
    "description": "Roblox username or User ID"
   }
  ],
  "prefix": [
   "avatar"
  ]
 },
 {
  "name": "avatar-3d",
  "description": "Get a Roblox avatar's 3D model as a downloadable file",
  "category": "Roblox",
  "params": [
   {
    "name": "userid",
    "required": true,
    "description": "Roblox User ID"
   },
   {
    "name": "format",
    "required": false,
    "description": "File format (default: obj)"
   }
  ],
  "prefix": []
 },
 {
  "name": "blocktanks",
  "description": "Fetch BlockTanks user info",
  "category": "Games",
  "params": [
   {
    "name": "user",
    "required": true,
    "description": "BlockTanks username"
   }
  ],
  "prefix": []
 },
 {
  "name": "british",
  "description": "Check if a Roblox account is British",
  "category": "Roblox",
  "params": [
   {
    "name": "user",
    "required": true,
    "description": "Roblox username or User ID to check"
   }
  ],
  "prefix": [
   "british",
   "brit",
   "britcheck"
  ]
 },
 {
  "name": "bruteforce link",
  "description": "Find the live links an id or string belongs to.",
  "category": "Tools",
  "params": [
   {
    "name": "string",
    "required": true,
    "description": "The id or string from a link, e.g. dQw4w9WgXcQ or 1567 (a full link works too)"
   }
  ],
  "prefix": []
 },
 {
  "name": "bust",
  "description": "Get a Roblox user's avatar bust image",
  "category": "Roblox",
  "params": [
   {
    "name": "user",
    "required": true,
    "description": "Roblox username or User ID"
   }
  ],
  "prefix": [
   "bust"
  ]
 },
 {
  "name": "chars",
  "description": "Count how many characters are in a string",
  "category": "Tools",
  "params": [
   {
    "name": "text",
    "required": true,
    "description": "The text to count"
   }
  ],
  "prefix": [
   "chars"
  ]
 },
 {
  "name": "cipher decode",
  "description": "Decode / decrypt text, or let me identify the cipher",
  "category": "Tools",
  "params": [
   {
    "name": "type",
    "required": true,
    "description": "Which cipher or encoding, or Identify to detect it automatically"
   },
   {
    "name": "text",
    "required": true,
    "description": "The text to decode (ignored if you attach a file in use-file)"
   },
   {
    "name": "use-file",
    "required": false,
    "description": "A .txt file to use instead of text (max 500 KB)"
   },
   {
    "name": "key",
    "required": false,
    "description": "Only for ciphers that need one (Vigenère keyword, Caesar shift); with Identify, an optional…"
   }
  ],
  "prefix": []
 },
 {
  "name": "cipher encode",
  "description": "Encode / encrypt text with a cipher or encoding",
  "category": "Tools",
  "params": [
   {
    "name": "type",
    "required": true,
    "description": "Which cipher or encoding to use"
   },
   {
    "name": "text",
    "required": true,
    "description": "The text to encode (ignored if you attach a file in use-file)"
   },
   {
    "name": "use-file",
    "required": false,
    "description": "A .txt file to use instead of text (max 500 KB)"
   },
   {
    "name": "key",
    "required": false,
    "description": "Only for ciphers that need one: Vigenère keyword, Caesar shift number"
   }
  ],
  "prefix": []
 },
 {
  "name": "cipher identify",
  "description": "Identify what cipher or encoding a text might be",
  "category": "Tools",
  "params": [
   {
    "name": "query",
    "required": true,
    "description": "The ciphertext to identify"
   },
   {
    "name": "clue",
    "required": false,
    "description": "Optional hint: a cipher name (e.g. morse) or a possible Vigenère key"
   }
  ],
  "prefix": []
 },
 {
  "name": "cipher rot",
  "description": "Try every ROT shift (ROT-0 to ROT-25) on a text, results come as a .txt file",
  "category": "Tools",
  "params": [
   {
    "name": "text",
    "required": true,
    "description": "The text to run through every ROT shift"
   }
  ],
  "prefix": []
 },
 {
  "name": "coinflip",
  "description": "Flip a coin — Heads or Tails",
  "category": "Fun",
  "params": [],
  "prefix": []
 },
 {
  "name": "display",
  "description": "Check if a Roblox display name is available",
  "category": "Roblox",
  "params": [
   {
    "name": "display_name",
    "required": true,
    "description": "Display name to check"
   }
  ],
  "prefix": [
   "display",
   "displayname",
   "name"
  ]
 },
 {
  "name": "followers",
  "description": "Get a Roblox user's followers",
  "category": "Roblox",
  "params": [
   {
    "name": "user",
    "required": true,
    "description": "Roblox username or User ID"
   }
  ],
  "prefix": [
   "followers",
   "follower"
  ]
 },
 {
  "name": "followings",
  "description": "Get who a Roblox user is following",
  "category": "Roblox",
  "params": [
   {
    "name": "user",
    "required": true,
    "description": "Roblox username or User ID"
   }
  ],
  "prefix": [
   "followings",
   "following"
  ]
 },
 {
  "name": "friends",
  "description": "Get a Roblox user's friends",
  "category": "Roblox",
  "params": [
   {
    "name": "user",
    "required": true,
    "description": "Roblox username or User ID"
   }
  ],
  "prefix": [
   "friends",
   "friend"
  ]
 },
 {
  "name": "game",
  "description": "Look up a Roblox game/experience by ID or name",
  "category": "Roblox",
  "params": [
   {
    "name": "query",
    "required": true,
    "description": "Roblox place/universe ID, or a game name to search"
   },
   {
    "name": "universe",
    "required": false,
    "description": "Search the ID as a universe ID instead of a place ID (default: off)"
   },
   {
    "name": "place",
    "required": false,
    "description": "Search the ID as a place ID (default behavior — explicit override)"
   }
  ],
  "prefix": [
   "game",
   "gameid"
  ]
 },
 {
  "name": "gamepass",
  "description": "Get info about a Roblox gamepass",
  "category": "Roblox",
  "params": [
   {
    "name": "gamepass",
    "required": true,
    "description": "Gamepass ID or gamepass link"
   }
  ],
  "prefix": [
   "gamepass",
   "gp",
   "pass"
  ]
 },
 {
  "name": "games",
  "description": "Get published Roblox games by a user",
  "category": "Roblox",
  "params": [
   {
    "name": "user",
    "required": true,
    "description": "Roblox username or User ID"
   }
  ],
  "prefix": [
   "games"
  ]
 },
 {
  "name": "generate",
  "description": "Generates and checks available Roblox usernames",
  "category": "Roblox",
  "params": [
   {
    "name": "type",
    "required": true,
    "description": "The format/type of usernames to generate"
   },
   {
    "name": "show",
    "required": false,
    "description": "Set to True to make the results public, False for ephemeral"
   },
   {
    "name": "fast",
    "required": false,
    "description": "Give back one saved/checked username instantly instead of the full batch"
   }
  ],
  "prefix": []
 },
 {
  "name": "gif",
  "description": "Convert an image to .gif format (so it can be favorited/reused in Discord)",
  "category": "Image",
  "params": [
   {
    "name": "image",
    "required": false,
    "description": "Attach an image to convert"
   },
   {
    "name": "link",
    "required": false,
    "description": "A direct image link, or a page like a Pinterest pin/tweet"
   },
   {
    "name": "colors",
    "required": false,
    "description": "Color palette size, 2-256 (default 256, lower = smaller file, rougher colors)"
   },
   {
    "name": "dither",
    "required": false,
    "description": "Whether to dither the reduced color palette (default on)"
   }
  ],
  "prefix": []
 },
 {
  "name": "group",
  "description": "Look up a Roblox group/community by ID or name",
  "category": "Roblox",
  "params": [
   {
    "name": "query",
    "required": true,
    "description": "Roblox Group ID or name to search"
   }
  ],
  "prefix": [
   "group",
   "g",
   "gr",
   "gid",
   "groupid"
  ]
 },
 {
  "name": "groups",
  "description": "Get the Roblox groups a user belongs to",
  "category": "Roblox",
  "params": [
   {
    "name": "user",
    "required": true,
    "description": "Roblox username or User ID"
   }
  ],
  "prefix": [
   "groups"
  ]
 },
 {
  "name": "headshot",
  "description": "Get a Roblox user's avatar headshot image",
  "category": "Roblox",
  "params": [
   {
    "name": "user",
    "required": true,
    "description": "Roblox username or User ID"
   }
  ],
  "prefix": [
   "headshot"
  ]
 },
 {
  "name": "help",
  "description": "See everything Chomik can do.",
  "category": "General",
  "params": [],
  "prefix": []
 },
 {
  "name": "id",
  "description": "Look up a Roblox account by User ID",
  "category": "Roblox",
  "params": [
   {
    "name": "userid",
    "required": true,
    "description": "Roblox User ID to search"
   },
   {
    "name": "raw",
    "required": false,
    "description": "Return the profile info as organized JSON (no embed) instead of the normal profile"
   }
  ],
  "prefix": [
   "id",
   "uid"
  ]
 },
 {
  "name": "image blur",
  "description": "Blur an image",
  "category": "Image",
  "params": [
   {
    "name": "image",
    "required": false,
    "description": "Attach an image to blur"
   },
   {
    "name": "link",
    "required": false,
    "description": "A direct image link, or a page like a Pinterest pin/tweet"
   },
   {
    "name": "strength",
    "required": false,
    "description": "Blur strength (default 6)"
   }
  ],
  "prefix": []
 },
 {
  "name": "image gif",
  "description": "Convert an image to .gif format (so it can be favorited/reused in Discord)",
  "category": "Image",
  "params": [
   {
    "name": "image",
    "required": false,
    "description": "Attach an image to convert"
   },
   {
    "name": "link",
    "required": false,
    "description": "A direct image link, or a page like a Pinterest pin/tweet"
   },
   {
    "name": "colors",
    "required": false,
    "description": "Color palette size, 2-256 (default 256, lower = smaller file, rougher colors)"
   },
   {
    "name": "dither",
    "required": false,
    "description": "Whether to dither the reduced color palette (default on)"
   }
  ],
  "prefix": []
 },
 {
  "name": "image greyscale",
  "description": "Convert an image to greyscale",
  "category": "Image",
  "params": [
   {
    "name": "image",
    "required": false,
    "description": "Attach an image to convert"
   },
   {
    "name": "link",
    "required": false,
    "description": "A direct image link, or a page like a Pinterest pin/tweet"
   },
   {
    "name": "intensity",
    "required": false,
    "description": "How strong the effect is, 0-100 (default 100 = fully greyscale)"
   }
  ],
  "prefix": []
 },
 {
  "name": "image invert",
  "description": "Invert an image's colors",
  "category": "Image",
  "params": [
   {
    "name": "image",
    "required": false,
    "description": "Attach an image to invert"
   },
   {
    "name": "link",
    "required": false,
    "description": "A direct image link, or a page like a Pinterest pin/tweet"
   }
  ],
  "prefix": []
 },
 {
  "name": "image pixelate",
  "description": "Pixelate an image",
  "category": "Image",
  "params": [
   {
    "name": "image",
    "required": false,
    "description": "Attach an image to pixelate"
   },
   {
    "name": "link",
    "required": false,
    "description": "A direct image link, or a page like a Pinterest pin/tweet"
   },
   {
    "name": "block_size",
    "required": false,
    "description": "Pixel block size (default 12, bigger = blockier)"
   }
  ],
  "prefix": []
 },
 {
  "name": "image rotate",
  "description": "Rotate an image",
  "category": "Image",
  "params": [
   {
    "name": "image",
    "required": false,
    "description": "Attach an image to rotate"
   },
   {
    "name": "link",
    "required": false,
    "description": "A direct image link, or a page like a Pinterest pin/tweet"
   },
   {
    "name": "degrees",
    "required": false,
    "description": "Degrees to rotate clockwise (default 90)"
   },
   {
    "name": "expand",
    "required": false,
    "description": "Grow the canvas so nothing gets cropped off (default on)"
   }
  ],
  "prefix": []
 },
 {
  "name": "invert",
  "description": "Invert an image's colors",
  "category": "Image",
  "params": [
   {
    "name": "image",
    "required": false,
    "description": "Attach an image to invert"
   },
   {
    "name": "link",
    "required": false,
    "description": "A direct image link, or a page like a Pinterest pin/tweet"
   }
  ],
  "prefix": []
 },
 {
  "name": "invite",
  "description": "Get Chomik's invite link.",
  "category": "General",
  "params": [],
  "prefix": []
 },
 {
  "name": "jekivuz",
  "description": "Outputs 56, 67, or 78 (67 is twice as likely)",
  "category": "Fun",
  "params": [
   {
    "name": "disable_distortion",
    "required": false,
    "description": "Send just 56, 67, or 78 with no distortion/flourishes (default off)"
   },
   {
    "name": "equal_chances",
    "required": false,
    "description": "Make 56, 67, and 78 all equally likely (default off — 67 is 50%)"
   }
  ],
  "prefix": []
 },
 {
  "name": "language",
  "description": "Get the language of a Roblox account",
  "category": "Roblox",
  "params": [
   {
    "name": "user",
    "required": true,
    "description": "Roblox username or User ID"
   }
  ],
  "prefix": [
   "language",
   "lang"
  ]
 },
 {
  "name": "mutuals",
  "description": "Check if a Roblox account is friends with up to 5 other accounts",
  "category": "Roblox",
  "params": [
   {
    "name": "user",
    "required": true,
    "description": "Roblox username or User ID"
   },
   {
    "name": "target1",
    "required": true,
    "description": "Roblox username or User ID"
   },
   {
    "name": "target2",
    "required": false,
    "description": "Roblox username or User ID (optional)"
   },
   {
    "name": "target3",
    "required": false,
    "description": "Roblox username or User ID (optional)"
   },
   {
    "name": "target4",
    "required": false,
    "description": "Roblox username or User ID (optional)"
   },
   {
    "name": "target5",
    "required": false,
    "description": "Roblox username or User ID (optional)"
   }
  ],
  "prefix": [
   "mutuals",
   "isfriends",
   "friendswith"
  ]
 },
 {
  "name": "names",
  "description": "Get previous usernames of a Roblox user",
  "category": "Roblox",
  "params": [
   {
    "name": "user",
    "required": true,
    "description": "Roblox username or User ID"
   }
  ],
  "prefix": [
   "names"
  ]
 },
 {
  "name": "notifier add",
  "description": "Add a username to the watchlist",
  "category": "Notifier",
  "params": [
   {
    "name": "username",
    "required": true,
    "description": "Roblox username to track — no restrictions on what can be added"
   }
  ],
  "prefix": []
 },
 {
  "name": "notifier list",
  "description": "List all tracked usernames",
  "category": "Notifier",
  "params": [
   {
    "name": "note",
    "required": false,
    "description": "Optional note appended below the list"
   }
  ],
  "prefix": []
 },
 {
  "name": "notifier ready",
  "description": "Switch between simultaneous bulk checking and individual per-username checking",
  "category": "Notifier",
  "params": [
   {
    "name": "true_false",
    "required": true,
    "description": "True = check usernames one at a time, False = check all of them at once (default)"
   },
   {
    "name": "check_gap",
    "required": false,
    "description": "Optional: seconds between checks, applies to whichever mode is active (default 5s)"
   }
  ],
  "prefix": []
 },
 {
  "name": "notifier remove",
  "description": "Remove a username from the watchlist",
  "category": "Notifier",
  "params": [
   {
    "name": "username",
    "required": true,
    "description": "Roblox username to remove (not case-sensitive)"
   }
  ],
  "prefix": []
 },
 {
  "name": "outfits",
  "description": "Get a Roblox user's avatars and outfits (not supported for erased accounts)",
  "category": "Roblox",
  "params": [
   {
    "name": "user",
    "required": true,
    "description": "Roblox username or User ID"
   }
  ],
  "prefix": [
   "outfits",
   "outfit",
   "avatars",
   "fits"
  ]
 },
 {
  "name": "ping",
  "description": "Check Chomik's latency.",
  "category": "General",
  "params": [],
  "prefix": []
 },
 {
  "name": "pinterest search",
  "description": "Search Pinterest for pins (images)",
  "category": "Social",
  "params": [
   {
    "name": "query",
    "required": true,
    "description": "What to search for"
   }
  ],
  "prefix": []
 },
 {
  "name": "report",
  "description": "Report a Roblox user.",
  "category": "Reports",
  "params": [
   {
    "name": "user",
    "required": true,
    "description": "Roblox username to report"
   },
   {
    "name": "type",
    "required": false,
    "description": "Report the username or the avatar (defaults to username)"
   },
   {
    "name": "category",
    "required": false,
    "description": "Report category (defaults to Swearing, or Off-site Links for *YT/YT* names)"
   },
   {
    "name": "reason",
    "required": false,
    "description": "Optional reason/comment for the report"
   },
   {
    "name": "anonymous",
    "required": false,
    "description": "Hide your name on the moderation update (shows 'Reported Anonymously' instead)"
   }
  ],
  "prefix": [
   "report",
   "r"
  ]
 },
 {
  "name": "reports",
  "description": "View report statistics.",
  "category": "Reports",
  "params": [
   {
    "name": "user",
    "required": false,
    "description": "View another user's report stats (defaults to you)"
   },
   {
    "name": "global",
    "required": false,
    "description": "View the global report stats instead"
   }
  ],
  "prefix": [
   "stats",
   "reports"
  ]
 },
 {
  "name": "resolve",
  "description": "Get a Roblox user's profile link",
  "category": "Roblox",
  "params": [
   {
    "name": "user",
    "required": true,
    "description": "Roblox username or User ID"
   }
  ],
  "prefix": [
   "resolve",
   "re"
  ]
 },
 {
  "name": "ropro",
  "description": "Look up a Roblox account's RoPro info",
  "category": "Roblox",
  "params": [
   {
    "name": "query",
    "required": true,
    "description": "Roblox username or User ID"
   }
  ],
  "prefix": [
   "ropro"
  ]
 },
 {
  "name": "say",
  "description": "Make the bot say something via a text box",
  "category": "Say",
  "params": [],
  "prefix": []
 },
 {
  "name": "scrape",
  "description": "Scrape Roblox users",
  "category": "Tools",
  "params": [
   {
    "name": "start_id",
    "required": true,
    "description": "Start ID of where it's checking"
   },
   {
    "name": "amount",
    "required": true,
    "description": "Amount of IDs to check, max 100000 (if random=True, this is how many random IDs to pick from the…"
   },
   {
    "name": "end_id",
    "required": false,
    "description": "End ID of the range (required only if random=True)"
   },
   {
    "name": "keyword",
    "required": false,
    "description": "Only show usernames containing keyword(s), comma-separated. %20 or + = space (optional)"
   },
   {
    "name": "startswith",
    "required": false,
    "description": "Only show usernames starting with this (comma-separated, optional)"
   },
   {
    "name": "endswith",
    "required": false,
    "description": "Only show usernames ending with this (comma-separated, optional)"
   },
   {
    "name": "blacklist",
    "required": false,
    "description": "Words to exclude from matching (e.g. false positives), comma-separated (optional)"
   },
   {
    "name": "excludetermed",
    "required": false,
    "description": "Exclude accounts flagged as terminated (isDeleted=true) (optional)"
   },
   {
    "name": "random",
    "required": false,
    "description": "Instead of a sequential range, pick `amount` random IDs between start_id and end_id (optional)"
   }
  ],
  "prefix": []
 },
 {
  "name": "settings",
  "description": "Manage your Chomik usage.",
  "category": "General",
  "params": [],
  "prefix": []
 },
 {
  "name": "subdomain",
  "description": "Find the known subdomains of a website",
  "category": "Tools",
  "params": [
   {
    "name": "link",
    "required": true,
    "description": "A link or domain, e.g. https://x.com or x.com"
   }
  ],
  "prefix": []
 },
 {
  "name": "subplaces",
  "description": "List a Roblox game's subplaces by universe/place ID or name",
  "category": "Roblox",
  "params": [
   {
    "name": "query",
    "required": true,
    "description": "Roblox place/universe ID, or a game name to search"
   },
   {
    "name": "universe",
    "required": false,
    "description": "Search the ID as a universe ID instead of a place ID (default: off)"
   }
  ],
  "prefix": [
   "subplaces",
   "sp"
  ]
 },
 {
  "name": "support",
  "description": "Send a Roblox support request (30 minute global cooldown)",
  "category": "Roblox",
  "params": [
   {
    "name": "username",
    "required": true,
    "description": "Your Roblox username"
   },
   {
    "name": "email",
    "required": true,
    "description": "Your email address"
   },
   {
    "name": "platform",
    "required": true,
    "description": "Your device"
   },
   {
    "name": "content",
    "required": true,
    "description": "Describe your issue"
   },
   {
    "name": "name",
    "required": false,
    "description": "Your name (optional)"
   },
   {
    "name": "age",
    "required": false,
    "description": "Your age (optional)"
   }
  ],
  "prefix": []
 },
 {
  "name": "text anagram",
  "description": "Find anagrams of a word or phrase",
  "category": "Tools",
  "params": [
   {
    "name": "query",
    "required": true,
    "description": "The word or phrase to find anagrams of"
   }
  ],
  "prefix": []
 },
 {
  "name": "text nutrimatic",
  "description": "Search Nutrimatic for words/phrases matching a query",
  "category": "Tools",
  "params": [
   {
    "name": "query",
    "required": true,
    "description": "The Nutrimatic query (e.g. a set of letters or a pattern)"
   }
  ],
  "prefix": []
 },
 {
  "name": "tiktok",
  "description": "Look up a TikTok user",
  "category": "Social",
  "params": [
   {
    "name": "query",
    "required": true,
    "description": "TikTok username (without @)"
   }
  ],
  "prefix": [
   "tiktok",
   "tt"
  ]
 },
 {
  "name": "universe",
  "description": "Convert a place ID to its universe ID",
  "category": "Roblox",
  "params": [
   {
    "name": "place_id",
    "required": true,
    "description": "Roblox place ID, or a roblox.com game URL"
   }
  ],
  "prefix": [
   "universe"
  ]
 },
 {
  "name": "user",
  "description": "Look up a Roblox account by username",
  "category": "Roblox",
  "params": [
   {
    "name": "username",
    "required": true,
    "description": "Roblox username to search"
   },
   {
    "name": "raw",
    "required": false,
    "description": "Return the profile info as organized JSON (no embed) instead of the normal profile"
   }
  ],
  "prefix": [
   "user",
   "u",
   "uu"
  ]
 },
 {
  "name": "username",
  "description": "Check if a Roblox username is available",
  "category": "Roblox",
  "params": [
   {
    "name": "username",
    "required": true,
    "description": "Roblox username to check"
   }
  ],
  "prefix": [
   "username"
  ]
 },
 {
  "name": "verified",
  "description": "Check when a user got the email verified items (not supported for erased accounts)",
  "category": "Roblox",
  "params": [
   {
    "name": "user",
    "required": true,
    "description": "Roblox username or User ID"
   }
  ],
  "prefix": []
 },
 {
  "name": "whitelist",
  "description": "Whitelist yourself to use Chomik",
  "category": "General",
  "params": [],
  "prefix": []
 },
 {
  "name": "wordbomb search",
  "description": "Search for Word Bomb words",
  "category": "Games",
  "params": [
   {
    "name": "prompt",
    "required": true,
    "description": "The prompt to search for (or '.' to list all)"
   },
   {
    "name": "regex",
    "required": false,
    "description": "Use regular expression instead of plain search"
   },
   {
    "name": "indonesian",
    "required": false,
    "description": "Search the Indonesian dictionary instead of English"
   }
  ],
  "prefix": []
 },
 {
  "name": "wordle answer",
  "description": "Get a day's Wordle answer (defaults to today, PHT)",
  "category": "Fun",
  "params": [
   {
    "name": "day",
    "required": false,
    "description": "Which day? e.g. September 30, 9/30/2026, 9-30-26, 30 September, 9/30 (default: today)"
   }
  ],
  "prefix": []
 },
 {
  "name": "wordle draw",
  "description": "Draw a color pattern into your Wordle board",
  "category": "Fun",
  "params": [],
  "prefix": []
 },
 {
  "name": "youtube",
  "description": "Look up a YouTube channel",
  "category": "Social",
  "params": [
   {
    "name": "query",
    "required": true,
    "description": "Channel handle (e.g. @mrbeast) or channel ID"
   }
  ],
  "prefix": [
   "youtube",
   "yt"
  ]
 }
];

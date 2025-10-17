import { useState, useMemo, lazy } from 'react'
import * as LucideIcons from 'lucide-react'
import dynamicIconImports from "lucide-react/dynamicIconImports";
import * as FaIcons from 'react-icons/fa'
import * as FiIcons from 'react-icons/fi'
import * as MdIcons from 'react-icons/md'
// import * as IoIcons from "react-icons/io"
import * as Io5Icons from 'react-icons/io5'
import * as BiIcons from 'react-icons/bi'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle
} from './ui/dialog'
import { Button } from './ui/Button'
import { ScrollArea } from './ui/scroll_area'

const ICON_LIBRARIES = {
  // lucide: iconList
  fi: FiIcons,
  // md: MdIcons,
  //   io: IoIcons,
  io5: Io5Icons,
  // bi: BiIcons,
}

const ICONS = Object.entries(ICON_LIBRARIES)
  .flatMap(([library, lib]) =>
    Object.entries(lib)
      .filter(([name, Icon]) => {
        if (typeof Icon !== 'function') return false
        const lowerName = name.toLowerCase()
        return true
      })
      .map(([name, Icon]) => ({ name, library, component: Icon }))
  )
  .filter(
    (icon, index, self) =>
      index ===
      self.findIndex(i => i.name === icon.name && i.library === icon.library)
  )

export default function IconPicker ({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  // const [selectedIcon, setSelectedIcon] = useState(value)
  const [filter, setFilter] = useState('')


  const selectedIcon=value
  const filteredIcons = useMemo(() => {
    return ICONS.filter((icon) =>
      icon.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [filter]);

  const handleSelect = name => {
    // setSelectedIcon(name)
    onChange?.(name)
    setOpen(false)
  }


  const SelectedIconObj = useMemo(() => {
    if (!selectedIcon) return FaIcons.FaQuestionCircle;

    const iconObj = ICONS.find(icon => icon.name === selectedIcon);
    return iconObj ? iconObj.component : FaIcons.FaQuestionCircle;
  }, [selectedIcon]);


  const handleOpen = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setOpen(true) 
    }, 100) 
  }


  return (
    <div className='flex flex-col gap-2'>
      <label className='text-sm font-medium text-gray-600'>Icône</label>

      <Button
        type='button'
        variant='outline'
        className='flex border-2 items-center gap-2'
        onClick={handleOpen}
        disabled={loading}
      >
        {loading ? (
          <span className='animate-spin border-2 border-gray-300 border-t-gray-500 rounded-full w-5 h-5'></span>
        ) : (
          <SelectedIconObj />
        )}
        <span>
          {loading ? 'Chargement...' : selectedIcon || 'Choisir une icône'}
        </span>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild />
        <DialogContent className='max-w-6xl'>
          <DialogHeader>
            <DialogTitle>Choisir une icône</DialogTitle>
          </DialogHeader>

          <input
            type='text'
            placeholder="Filtrer par nom d'icône..."
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className='mt-4 text-[.9rem] w-full p-2 border rounded'
          />

          <ScrollArea className='h-[450px] w-full mt-4'>
            <div className='grid grid-cols-8 gap-3'>
              {filteredIcons.map(({name,library,component:Icon}) => 
                  <button
                    key={`${name}`}
                    type='button'
                    onClick={() => handleSelect(name)}
                    className={`p-2 rounded-lg hover:bg-gray-100 flex flex-col items-center justify-center transition-colors ${
                      selectedIcon === name
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200'
                    }`}
                    title={`${name}`}
                  >
                    <Icon size={28} />
                    <span className='text-[9px] mt-1 truncate w-full text-center'>
                      {name}
                    </span>
                  </button>
                )}
            </div>
            {filteredIcons.length === 0 && (
                <div className="text-center w-full py-12">
                  <p className="text-muted-foreground">
                    Aucune icône trouvée pour "{filter}"
                  </p>
                </div>
              )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  )
}

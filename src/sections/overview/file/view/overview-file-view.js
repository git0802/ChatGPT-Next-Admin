'use client';

import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import { _files, _folders } from 'src/_mock';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { UploadBox } from 'src/components/upload';
import { useSettingsContext } from 'src/components/settings';

import FileWidget from '../../../file-manager/file-widget';
import FileUpgrade from '../../../file-manager/file-upgrade';
import FileRecentItem from '../../../file-manager/file-recent-item';
import FileDataActivity from '../../../file-manager/file-data-activity';
import FileManagerPanel from '../../../file-manager/file-manager-panel';
import FileStorageOverview from '../../../file-manager/file-storage-overview';
import FileManagerFolderItem from '../../../file-manager/file-manager-folder-item';
import FileManagerNewFolderDialog from '../../../file-manager/file-manager-new-folder-dialog';

// ----------------------------------------------------------------------

const GB = 1000000000 * 24;

const TIME_LABELS = {
  week: ['Mon', 'Tue', 'Web', 'Thu', 'Fri', 'Sat', 'Sun'],
  month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  year: ['2018', '2019', '2020', '2021', '2022'],
};

// ----------------------------------------------------------------------

export default function OverviewFileView() {
  const theme = useTheme();

  const smDown = useResponsive('down', 'sm');

  const settings = useSettingsContext();

  const [folderName, setFolderName] = useState('');

  const [files, setFiles] = useState([]);

  const newFolder = useBoolean();

  const upload = useBoolean();

  const handleChangeFolderName = useCallback((event) => {
    setFolderName(event.target.value);
  }, []);

  const handleCreateNewFolder = useCallback(() => {
    newFolder.onFalse();
    setFolderName('');
    console.info('CREATE NEW FOLDER');
  }, [newFolder]);

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setFiles([...files, ...newFiles]);
    },
    [files]
  );

  const renderStorageOverview = (
    <FileStorageOverview
      total={GB}
      chart={{
        series: 76,
      }}
      data={[
        {
          name: 'Images',
          usedStorage: GB / 2,
          filesCount: 223,
          icon: <Box component="img" src="/assets/icons/files/ic_img.svg" />,
        },
        {
          name: 'Media',
          usedStorage: GB / 5,
          filesCount: 223,
          icon: <Box component="img" src="/assets/icons/files/ic_video.svg" />,
        },
        {
          name: 'Documents',
          usedStorage: GB / 5,
          filesCount: 223,
          icon: <Box component="img" src="/assets/icons/files/ic_document.svg" />,
        },
        {
          name: 'Other',
          usedStorage: GB / 10,
          filesCount: 223,
          icon: <Box component="img" src="/assets/icons/files/ic_file.svg" />,
        },
      ]}
    />
  );

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          {smDown && <Grid xs={12}>{renderStorageOverview}</Grid>}

          <Grid xs={12} sm={6} md={4}>
            <FileWidget
              title="Dropbox"
              value={GB / 10}
              total={GB}
              icon="/assets/icons/app/ic_dropbox.svg"
            />
          </Grid>

          <Grid xs={12} sm={6} md={4}>
            <FileWidget
              title="Drive"
              value={GB / 5}
              total={GB}
              icon="/assets/icons/app/ic_drive.svg"
            />
          </Grid>

          <Grid xs={12} sm={6} md={4}>
            <FileWidget
              title="OneDrive"
              value={GB / 2}
              total={GB}
              icon="/assets/icons/app/ic_onedrive.svg"
            />
          </Grid>

          <Grid xs={12} md={6} lg={8}>
            <FileDataActivity
              title="Data Activity"
              chart={{
                labels: TIME_LABELS,
                colors: [
                  theme.palette.primary.main,
                  theme.palette.error.main,
                  theme.palette.warning.main,
                  theme.palette.text.disabled,
                ],
                series: [
                  {
                    type: 'Week',
                    data: [
                      { name: 'Images', data: [20, 34, 48, 65, 37, 48, 9] },
                      { name: 'Media', data: [10, 34, 13, 26, 27, 28, 18] },
                      { name: 'Documents', data: [10, 14, 13, 16, 17, 18, 28] },
                      { name: 'Other', data: [5, 12, 6, 7, 8, 9, 48] },
                    ],
                  },
                  {
                    type: 'Month',
                    data: [
                      {
                        name: 'Images',
                        data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34],
                      },
                      {
                        name: 'Media',
                        data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34],
                      },
                      {
                        name: 'Documents',
                        data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34],
                      },
                      {
                        name: 'Other',
                        data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34],
                      },
                    ],
                  },
                  {
                    type: 'Year',
                    data: [
                      { name: 'Images', data: [10, 34, 13, 56, 77] },
                      { name: 'Media', data: [10, 34, 13, 56, 77] },
                      { name: 'Documents', data: [10, 34, 13, 56, 77] },
                      { name: 'Other', data: [10, 34, 13, 56, 77] },
                    ],
                  },
                ],
              }}
            />

            <div>
              <FileManagerPanel
                title="Folders"
                link={paths.dashboard.fileManager}
                onOpen={newFolder.onTrue}
                sx={{ mt: 5 }}
              />

              <Scrollbar>
                <Stack direction="row" spacing={3} sx={{ pb: 3 }}>
                  {_folders.map((folder) => (
                    <FileManagerFolderItem
                      key={folder.id}
                      folder={folder}
                      onDelete={() => console.info('DELETE', folder.id)}
                      sx={{
                        ...(_folders.length > 3 && {
                          minWidth: 222,
                        }),
                      }}
                    />
                  ))}
                </Stack>
              </Scrollbar>

              <FileManagerPanel
                title="Recent Files"
                link={paths.dashboard.fileManager}
                onOpen={upload.onTrue}
                sx={{ mt: 2 }}
              />

              <Stack spacing={2}>
                {_files.slice(0, 5).map((file) => (
                  <FileRecentItem
                    key={file.id}
                    file={file}
                    onDelete={() => console.info('DELETE', file.id)}
                  />
                ))}
              </Stack>
            </div>
          </Grid>

          <Grid xs={12} md={6} lg={4}>
            <UploadBox
              onDrop={handleDrop}
              placeholder={
                <Stack spacing={0.5} alignItems="center" sx={{ color: 'text.disabled' }}>
                  <Iconify icon="eva:cloud-upload-fill" width={40} />
                  <Typography variant="body2">Upload file</Typography>
                </Stack>
              }
              sx={{
                mb: 3,
                py: 2.5,
                width: 'auto',
                height: 'auto',
                borderRadius: 1.5,
              }}
            />

            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>{renderStorageOverview}</Box>

            <FileUpgrade sx={{ mt: 3 }} />
          </Grid>
        </Grid>
      </Container>

      <FileManagerNewFolderDialog open={upload.value} onClose={upload.onFalse} />

      <FileManagerNewFolderDialog
        open={newFolder.value}
        onClose={newFolder.onFalse}
        title="New Folder"
        folderName={folderName}
        onChangeFolderName={handleChangeFolderName}
        onCreate={handleCreateNewFolder}
      />
    </>
  );
}
